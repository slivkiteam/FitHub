package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.repository.ActivityCategoriesRepository;
import com.fithub.FitHub.util.ActivityCategoryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public ActivityCategories save(ActivityCategories activityCategories) {
        var isSavedAlready = activityCategoriesRepository.findAll().stream().filter(a -> a.getCategory().equals(activityCategories.getCategory())).toList().isEmpty();
        if (isSavedAlready) {
            activityCategoriesRepository.save(activityCategories);
            return activityCategories;
        }
        return null;
    }
    @Transactional
    public void update(int id, ActivityCategories activityCategories) {
        var category = activityCategoriesRepository.findById(id).orElseThrow(ActivityCategoryNotFoundException::new);
        activityCategories.setId(category.getId());
    }
    @Transactional
    public void delete(int id) {
        activityCategoriesRepository.deleteById(id);
    }

}
