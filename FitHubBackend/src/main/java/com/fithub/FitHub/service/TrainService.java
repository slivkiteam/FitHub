package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.repository.TrainingsRepository;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class TrainService {
    private final TrainingsRepository trainingsRepository;
    private final ActivityCategoriesService activityCategoriesService;
    @Autowired
    public TrainService(TrainingsRepository trainingsRepository, ActivityCategoriesService activityCategoriesService) {
        this.trainingsRepository = trainingsRepository;
        this.activityCategoriesService = activityCategoriesService;
    }

    public List<Train> findAll() {
        return trainingsRepository.findAll();
    }

    public Train findById(Long id) {
        return trainingsRepository.findById(id).orElseThrow(TrainNotFoundException::new);
    }

    @Transactional
    public void save(Train train) {
        Set<ActivityCategories> categories = new HashSet<>();
        for (var category : train.getCategories()) {
            // Проверяем, сохранена ли категория
            if (category.getId() == null) {
                // Если категория новая, сохраняем её в базе
                var savedCategory = activityCategoriesService.save(category);
                if (savedCategory != null) {
                    categories.add(savedCategory);
                }
            } else {
                // Если категория уже существует, загружаем её
                var existingCategory = activityCategoriesService.findById(category.getId());
                categories.add(existingCategory);
            }
        }
        train.setCategories(categories);

        train.getCategories().forEach(activityCategoriesService::save);
        trainingsRepository.save(train);
    }
    //    private void enrichTrain(Train train) {
//        train.setCategories(); просто знай, что так можно и это нужно до сохранения
//    }

    @Transactional
    public void delete(Train train) {
        trainingsRepository.delete(train);
    }

    @Transactional
    public void update(Long id, Train train) {
        Train t = trainingsRepository.findById(id).orElseThrow(TrainNotFoundException::new);
        train.setId(id);
        //связь с другим объектом тоже переназначить потом (пользователь, упражнение и т.п)
        trainingsRepository.save(train);
    }
}
