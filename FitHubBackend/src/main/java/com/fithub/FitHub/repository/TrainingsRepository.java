package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingsRepository extends JpaRepository<Train, Long> {
}
