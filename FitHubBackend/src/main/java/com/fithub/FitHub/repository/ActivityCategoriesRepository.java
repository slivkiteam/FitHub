package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityCategoriesRepository extends JpaRepository<ActivityCategories, Integer> {
    ActivityCategories findByCategory(String category);
}