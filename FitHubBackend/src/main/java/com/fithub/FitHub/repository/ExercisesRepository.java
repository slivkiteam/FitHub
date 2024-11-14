package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Exercises;
import com.fithub.FitHub.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExercisesRepository extends JpaRepository<Exercises, Long> {
    Exercises findByTitle(String title);
    List<Exercises> findAllByCategoryAndPlaceAndStatus(ActivityCategories category, String place, Status status);
}
