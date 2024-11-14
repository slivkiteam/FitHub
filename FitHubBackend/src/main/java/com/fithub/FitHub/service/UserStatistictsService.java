package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.UserStatistics;
import com.fithub.FitHub.repository.UserStatisticsRepository;
import com.fithub.FitHub.util.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserStatistictsService {

    private final UserStatisticsRepository userStatisticsRepository;
    @Autowired
    public UserStatistictsService(UserStatisticsRepository userStatisticsRepository) {
        this.userStatisticsRepository = userStatisticsRepository;
    }

    public List<UserStatistics> findAll() {
        return userStatisticsRepository.findAll();
    }

    public UserStatistics findById(Long id) {
        return userStatisticsRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }
    @Transactional
    public UserStatistics save(UserStatistics userStatistics) {
        return userStatisticsRepository.save(userStatistics);
    }
    @Transactional
    public void delete(Long id) {
        userStatisticsRepository.deleteById(id);
    }

    @Transactional
    public void update(Long id, UserStatistics userStatistics) {
        var uS = findById(id);
        userStatistics.setId(uS.getId());
        userStatisticsRepository.save(userStatistics);
    }
}
