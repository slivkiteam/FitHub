package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.UsersDTO;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.repository.UsersRepository;
import com.fithub.FitHub.security.UsersDetails;
import com.fithub.FitHub.util.UserNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UsersService {

    private final UsersRepository usersRepository;
    private final ModelMapper modelMapper;
    private final UserStatistictsService userStatistictsService;

    @Autowired
    public UsersService(UsersRepository usersRepository, ModelMapper modelMapper, UserStatistictsService userStatistictsService) {
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
        this.userStatistictsService = userStatistictsService;
    }

    public List<UsersDTO> findAll() {
        return usersRepository.findAll().stream().map(this::convertToUsersDTO).toList();
    }

    public Users findById(Long id) {
        return usersRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public UsersDTO findUserDTO(Long id) {
        return convertToUsersDTO(findById(id));
    }

    public Optional<Users> findByLogin(String login) {
        return usersRepository.findByLogin(login);
    }

    @Transactional
    public void save(Users user) {
        user.getUserStatistics().setUser(user);
        usersRepository.save(user);
    }

    public Users enrichUser(Users user) {
        LocalDate currentDate = LocalDate.now();
        var a = user.getBirthday().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        user.setAge(Period.between(a, currentDate).getYears());
        return user;
    }

    @Transactional
    public void delete(Long id) {
        usersRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, Users updatedUser) {
        updatedUser.setId(id);
        enrichUserStatistics(id, updatedUser);
        var year = updatedUser.getAge();
        LocalDate localDate = LocalDate.of(LocalDate.now().getYear() - year, 1, 1);
        var d = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        updatedUser.setBirthday(d);
        save(updatedUser);
    }

    private void enrichUserStatistics(Long id, Users updatedUser) {
        var userStatistics = userStatistictsService.findByUserId(id);
        if (userStatistics != null) {
            updatedUser.getUserStatistics().setId(userStatistics.getId());
        } else {
            updatedUser.getUserStatistics().setUser(updatedUser);
            userStatistictsService.save(updatedUser.getUserStatistics());
        }
    }

    @Transactional
    public void addTrains(Long id, Train train) {
        Users user = findById(id);
        user.getTrains().add(train);
        save(user);
    }

    public Users createFromDTO(UsersDTO userDTO) {
        var user = modelMapper.map(userDTO, Users.class);
//        return enrichUser(user);
        return user;
    }

    public UsersDTO convertToUsersDTO(Users user) {
        user = enrichUser(user);
        return modelMapper.map(user, UsersDTO.class);
    }

    public Users getUserAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();
        return usersDetails.getUser();
    }

    public UsersDTO getUserAuthDTO() {
        return convertToUsersDTO(getUserAuth());
    }
}
