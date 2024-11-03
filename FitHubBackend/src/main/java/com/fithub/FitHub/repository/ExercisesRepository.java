package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.Exercises;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExercisesRepository extends JpaRepository<Exercises, Long> {
    Exercises findByTitle(String title);
}
