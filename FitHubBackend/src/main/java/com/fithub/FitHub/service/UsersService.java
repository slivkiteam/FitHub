package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.repository.UsersRepository;
import com.fithub.FitHub.security.UsersDetails;
import com.fithub.FitHub.util.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> findAll() {
        return usersRepository.findAll();
    }

    public Users findById(Long id) {
        return usersRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Optional<Users> findByLogin(String login) {
        return usersRepository.findByLogin(login);
    }

    @Transactional
    public void save(Users user) {
        usersRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        usersRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, Users updatedUser) {
        Users user = findById(id); // Здесь я взял метод из класса сервиса, а не из репозитория(суть та же, код не повторяется и короче)
        updatedUser.setId(user.getId());
        usersRepository.save(updatedUser);
    }

    public Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UsersDetails userDetails) {
                return userDetails.getUser();
            }
        }
        return null;
    }
}
