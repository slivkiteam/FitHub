package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.repository.TrainingsRepository;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class TrainService {
    private final TrainingsRepository trainingsRepository;
    private final ActivityCategoriesService activityCategoriesService;
    private final ModelMapper modelMapper;

    @Autowired
    public TrainService(TrainingsRepository trainingsRepository, ActivityCategoriesService activityCategoriesService, List<Users> users, UsersService usersService, ModelMapper modelMapper) {
        this.trainingsRepository = trainingsRepository;
        this.activityCategoriesService = activityCategoriesService;
        this.modelMapper = modelMapper;
    }

    public List<Train> findAll() {
        return trainingsRepository.findAll();
    }

    public Train findById(Long id) {
        return trainingsRepository.findById(id).orElseThrow(TrainNotFoundException::new);
    }

    @Transactional
    public void save(Train train) {
        //var activityCategory = activityCategoriesService.needToSave(train.getCategory()); // cоздается треня без поля категория и туда null передался и все сломалось
        //train.setCategory(activityCategory);
        trainingsRepository.save(train);
    }
    //    private void enrichTrain(Train train) {
//        train.setCategories(); просто знай, что так можно и это нужно до сохранения
//    }

    @Transactional
    public void delete(Long id) {
        var train = trainingsRepository.findById(id).orElse(null);
        trainingsRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, Train train) {
        Train t = findById(id);
        train.setId(t.getId());
        train.setCategory(t.getCategory());
        //связь с другим объектом тоже переназначить потом (пользователь, упражнение и т.п)
        trainingsRepository.save(train);
    }

    public Train createFromDTO(TrainDTO trainDTO) {
        return modelMapper.map(trainDTO, Train.class);
    }

    public TrainDTO converteToTrainDTO(Train train) {
        return modelMapper.map(train, TrainDTO.class);
    }

    @Transactional
    public void addUsers(Long id, List<Users> users) {
        Train train = findById(id);
        List<Users> trainUsers = train.getUsers();
        trainUsers.addAll(users);
        save(train);
    }
}