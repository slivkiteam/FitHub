package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByTrainId(Long trainsId);
}
