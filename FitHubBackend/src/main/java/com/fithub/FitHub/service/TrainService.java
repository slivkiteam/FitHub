package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.entity.*;
import com.fithub.FitHub.repository.TrainingsRepository;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TrainService {
    private final TrainingsRepository trainingsRepository;
    private final ActivityCategoriesService activityCategoriesService;
    private final ModelMapper modelMapper;
    private final ImageService imageService;
    private final int NUMBER_OF_PAGINATION = 4;

    @Autowired
    public TrainService(TrainingsRepository trainingsRepository, ActivityCategoriesService activityCategoriesService, ModelMapper modelMapper, ImageService imageService) {
        this.trainingsRepository = trainingsRepository;
        this.activityCategoriesService = activityCategoriesService;
        this.modelMapper = modelMapper;
        this.imageService = imageService;
    }
//    //локально искать все тренировки, не для вывода к фронту!!! чтобы выводить не Page, а лист
    public List<Train> findAll() {
        return trainingsRepository.findAll();
    }

    public Page<TrainDTO> findAll(Specification<Train> trainsSpecification, Integer page, String typeOfSort) {
        if (page == null)
            return trainingsRepository.findAll(trainsSpecification, PageRequest.of(0, NUMBER_OF_PAGINATION)).map(c -> modelMapper.map(c, TrainDTO.class));
        if (typeOfSort != null && typeOfSort.equals("more")) {
            return trainingsRepository.findAll(trainsSpecification, PageRequest.of(page, NUMBER_OF_PAGINATION, Sort.by("durationInMinutes").descending())).map(c -> modelMapper.map(c, TrainDTO.class));
        } if (typeOfSort != null && typeOfSort.equals("less")) {
            return trainingsRepository.findAll(trainsSpecification, PageRequest.of(page, NUMBER_OF_PAGINATION, Sort.by("durationInMinutes").ascending())).map(c -> modelMapper.map(c, TrainDTO.class));
        } else {
            return trainingsRepository.findAll(trainsSpecification, PageRequest.of(page, NUMBER_OF_PAGINATION)).map(c -> modelMapper.map(c, TrainDTO.class));
        }
    }

    public List<Train> findTrainByTitleStartingWith(String start) {
        return trainingsRepository.findBookByTitleStartingWith(start);
    }

    public Train findById(Long id) {
        return trainingsRepository.findById(id).orElseThrow(TrainNotFoundException::new);
    }

    @Transactional
    public Train save(Train train) {
        var activityCategory = activityCategoriesService.needToSave(train.getCategory());
        train.setCategory(activityCategory);
        return trainingsRepository.save(train);
    }
    //    private void enrichTrain(Train train) {
//        train.setCategories(); просто знай, что так можно и это нужно до сохранения
//    }

    @Transactional
    public void delete(Long id) {
        trainingsRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, Train train) {
//        Train t = findById(id);
        train.setId(id);
        trainingsRepository.save(train);
    }

    public Train createFromDTO(TrainDTO trainDTO) {
        return modelMapper.map(trainDTO, Train.class);
    }

    public TrainDTO converteToTrainDTO(Train train) {
        return modelMapper.map(train, TrainDTO.class);
    }

    @Transactional
    public void addExercises(Long id, Exercises exercises) {
        Train train = findById(id);
        train.getExercises().add(exercises);
        save(train);
    }

    @Transactional
    public Train needToSave(Train train) {
        var isContain = findAll().stream().map(Train::getTitle).toList().contains(train.getTitle());
        if (!isContain) {
            return save(train);
        }
        train.setId(trainingsRepository.findByTitle(train.getTitle()).getId());
        return train;
    }

    public Train addCategory(Train currentTrain, String activityCategories) {
        var category = activityCategoriesService.findByCategory(activityCategories);
        currentTrain.setCategory(category);
        return currentTrain;
        //возможно нужно и сохранять, но это при условии, что тренировку после генерации мы сохраняем сразу, но это ведь не так???
    }

    @Transactional
    public void uploadImage(Long id, TrainImage trainImage) {
        String fileName = imageService.upload(trainImage);
        var t = findById(id);
        t.setImage(fileName);
        save(t);
    }

    public String getUrlByTrainId(Long trainId) {
        var t = findById(trainId);
        if (t == null || t.getImage() == null) return "";
        return imageService.getPresignedUrl(t.getImage());
    }
}