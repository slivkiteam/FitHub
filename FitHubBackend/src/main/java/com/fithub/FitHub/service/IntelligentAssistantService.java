package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.dto.TrainsFilterDTO;
import com.fithub.FitHub.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional(readOnly = true)
public class IntelligentAssistantService {

    private final TrainService trainService;
    private final ExercisesService exercisesService;

    @Autowired
    public IntelligentAssistantService(TrainService trainService, ExercisesService exercisesService) {
        this.trainService = trainService;
        this.exercisesService = exercisesService;
    }

    public Double getCoefficient(Users user) {
        var coef = 1.0;
        var userStat = user.getUserStatistics();
        coef *= userStat.getSkill().getCoefficient();
        if (user.getGender().equals(Gender.ЖЕНСКИЙ)) {
            coef *= 0.5;
        }
        //если человек старше 30 и при этом у него не большой тренировочный опыт, то лучше урезать сложность
        if (user.getAge() > 30 && userStat.getSkill().getCoefficient() < 0.6) {
            coef *= ((double) Math.abs(90 - user.getAge()) / 100);
        }
        if (user.getAge() < 65 && (userStat.getIBW() <= 18.5 || userStat.getIBW() >= 24.9)) {
            coef *= 0.8;
        }
        if (user.getAge() >= 65 && user.getAge() < 72 && (userStat.getIBW() <= 22 || userStat.getIBW() >= 27)) {
            coef *= 0.7;
        }
        if (user.getAge() >= 72 && (userStat.getIBW() <= 23 || userStat.getIBW() >= 28)) {
            coef *= 0.6;
        }
        //смотреть, насколько он освоился в текущем скиле
        //Разница между скилами текущим и следующим
        //Подумать о возрастающей до бесконечности сложности, если человек сделает более 50 тренировок
        var currentDeltaOfSkills = Math.abs(Skill.getNextSkill(userStat.getSkill()).getCountTrainsForGetSkill() - userStat.getSkill().getCountTrainsForGetSkill());
        //Разница между прогрессом пользователя и количеством тренировок скила
        var userProgressInSkill = userStat.getCountOfTrains() - userStat.getSkill().getCountTrainsForGetSkill();
        // прогресс пользователя на этом skill
        var coefProgressInSkill = (double) (userProgressInSkill*100 / currentDeltaOfSkills)/100;
        coef *= (1 + coefProgressInSkill);
        return coef;
    }

    private List<Integer> parseTime(String time) {
        String regex = "\\d+";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(time);
        List<Integer> numbers = new ArrayList<>();
        while (matcher.find()) {
            numbers.add(Integer.parseInt(matcher.group()));
        }
        System.out.println(numbers);
        return numbers;
    }

    public List<Exercises> fillTrainExercises(List<Exercises> exercisesList, List<Integer> time) {
//        var results = new ArrayList<Exercises>();
//        if (time.size() > 1) {
//
//        }
//        while
        //доделать
        return null;
    }

    public TrainDTO generateTrain(Users user, TrainsFilterDTO trainsFilterDTO) {
        var currentTrain = new Train();
        user.setAge(20);
        var coefByUserData = getCoefficient(user);
        var times = parseTime(trainsFilterDTO.getTimes());
        var category = trainsFilterDTO.getActivityCategories().toUpperCase();
        var format = trainsFilterDTO.getFormats().toUpperCase();
        var status = trainsFilterDTO.getStatus().toUpperCase();
//        var exercisesByCategory = exercisesService.findAllByCategoryAndPlaceAndStatus(category, format, status);
//        currentTrain.setExercises(fillTrainExercises(exercisesByCategory, times));
        return trainService.converteToTrainDTO(currentTrain);
    }
}