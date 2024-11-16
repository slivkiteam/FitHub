package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.RatingDTO;
import com.fithub.FitHub.entity.AverageRating;
import com.fithub.FitHub.entity.Rating;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.repository.RatingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingService {


    private final RatingRepository ratingRepository;
    private final TrainService trainService;
    private final UsersService usersService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, TrainService trainService, UsersService usersService) {
        this.ratingRepository = ratingRepository;
        this.trainService = trainService;
        this.usersService = usersService;
    }

    public AverageRating calculateAverageRating(Long trainId) {
        List<Rating> ratings = ratingRepository.findByTrainId(trainId);
        AverageRating averageRating = new AverageRating();
        if (ratings.isEmpty()) {
            averageRating.setUserCount(0);
            averageRating.setAverageScore(0);
            averageRating.setFeedbacksAndUsersName(new ArrayList<>());
            return averageRating; // Возвращаем значения по умолчанию
        }

        double sum = 0;
        for (Rating rating : ratings) {
            sum += rating.getScore();
            averageRating.getFeedbacksAndUsersName().add(String.format("%s - %s", rating.getFeedback(), rating.getUser().getName()));
        }

        double average = sum / ratings.size();

        averageRating.setAverageScore(average);
        averageRating.setUserCount(ratings.size());
        return averageRating;
    }

    public void addRating(Long userId, Long trainId, int score, String feedback) {
        Users user = usersService.findById(userId);
        Train train = trainService.findById(trainId);

        Rating rating = new Rating();
        rating.setTrain(train);
        rating.setUser(user);
        rating.setScore(score);
        rating.setFeedback(feedback);
        ratingRepository.save(rating);
    }
}
