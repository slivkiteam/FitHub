package com.fithub.FitHub.repository;

import com.fithub.FitHub.entity.UserStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {
    UserStatistics findByUserId(long userId);
}
