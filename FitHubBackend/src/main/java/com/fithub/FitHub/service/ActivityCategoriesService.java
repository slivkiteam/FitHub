package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.repository.ActivityCategoriesRepository;
import com.fithub.FitHub.util.ActivityCategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Transactional(readOnly = true)
public class ActivityCategoriesService {
    private final ActivityCategoriesRepository activityCategoriesRepository;
    @Autowired
    public ActivityCategoriesService(ActivityCategoriesRepository activityCategoriesRepository) {
        this.activityCategoriesRepository = activityCategoriesRepository;
    }
    public List<ActivityCategories> findAll() {
        return activityCategoriesRepository.findAll();
    }
    public ActivityCategories findById(int id) {
        return activityCategoriesRepository.findById(id).orElseThrow(ActivityCategoryNotFoundException::new);
    }
    @Transactional
    public void save(ActivityCategories activityCategories) {
        activityCategoriesRepository.save(activityCategories);
    }

    public ActivityCategories needToSave(ActivityCategories activityCategories) {
        var isContain = activityCategoriesRepository.findAll().stream().map(ActivityCategories::getCategory).toList().contains(activityCategories.getCategory());
        if (!isContain) {
            activityCategoriesRepository.save(activityCategories);
        }
        activityCategories.setId(activityCategoriesRepository.findByCategory(activityCategories.getCategory()).getId());
        return activityCategories;
    }

    @Transactional
    public void update(int id, ActivityCategories activityCategories) {
        var category = activityCategoriesRepository.findById(id).orElseThrow(ActivityCategoryNotFoundException::new);
        activityCategories.setId(category.getId());
        activityCategoriesRepository.save(activityCategories);
    }
    @Transactional
    public void delete(int id) {
        activityCategoriesRepository.deleteById(id);
    }
}
