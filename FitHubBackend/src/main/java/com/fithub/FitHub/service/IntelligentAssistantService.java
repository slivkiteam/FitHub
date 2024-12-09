package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.dto.TrainsFilterDTO;
import com.fithub.FitHub.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
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
        var a = userStat.getSkill();
        var b = Skill.getNextSkill(userStat.getSkill());
        var c = Skill.getNextSkill(userStat.getSkill()).getCountTrainsForGetSkill();
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

    public List<Exercises> fillTrainExercises(List<Exercises> exercisesList, List<Integer> time, Status status) {
        var results = new ArrayList<Exercises>();
        var hardExercises =  new ArrayList<>(exercisesList.stream().filter(a -> a.getStatus().equals(Status.valueOf("СЛОЖНО"))).toList());
        var middleExercises =  new ArrayList<>(exercisesList.stream().filter(a -> a.getStatus().equals(Status.valueOf("СРЕДНЕ"))).toList());
        var easyExercises = new ArrayList<>(exercisesList.stream().filter(a -> a.getStatus().equals(Status.valueOf("ЛЕГКО"))).toList());
        var maxTrainingsHours = 1.5;
        var countOfChill = 1.5;
        var easyChillInSec = 150;
        var middleChillInSec = 110;
        var hardChillInSec =  60;
        var secondsInHours = 3600;
        var timeMax = (time.size() == 1) ? secondsInHours*maxTrainingsHours : time.get(1)*60;
        var timeMin = (time.size() == 1) ? time.get(0) : time.get(0)*60;
        var sumTime = 0;
        Random rand = new Random();
        while (sumTime <= timeMax) {
            var averageStatusCoef = (results.isEmpty()) ? 0 : results.stream().map(a -> a.getStatus().getCoefficient()).reduce(0.0, Double::sum)/results.size();
            if (averageStatusCoef > (status.getCoefficient()*1.5) && timeMin <= sumTime) break;
            var countEasy = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("ЛЕГКО"))).count();
            var countMiddle = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СРЕДНЕ"))).count();
            var countHard = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СЛОЖНО"))).count();
            if (status.equals(Status.valueOf("ЛЕГКО"))) {
                if (easyExercises.isEmpty() && middleExercises.isEmpty()) break;
                if (results.isEmpty() || (!easyExercises.isEmpty() && countEasy > 0 && ((double) countEasy / results.size()) <= 0.9)) {
                    var randomIndex = rand.nextInt(easyExercises.size());
                    var exercise = easyExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();
                    sumTime += (int) (easyChillInSec * countOfChill);
                    countOfChill += 0.25;
                    countEasy = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("ЛЕГКО"))).count();
                    easyExercises.remove(randomIndex);
                } else {
                    if (!middleExercises.isEmpty()) {
                        var randomIndex = rand.nextInt(middleExercises.size());
                        var exercise = middleExercises.get(randomIndex);
                        results.add(exercise);
                        sumTime += exercise.getDurationInSeconds();
                        sumTime += (int) (easyChillInSec * 2.2 * countOfChill);
                        countOfChill += 0.5;

                        countMiddle = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СРЕДНЕ"))).count();
                        middleExercises.remove(randomIndex);
                    }
                }
            }
            if (status.equals(Status.valueOf("СРЕДНЕ"))) {
                if (easyExercises.isEmpty() && middleExercises.isEmpty() && hardExercises.isEmpty()) break;
                if (results.isEmpty() || ((double) countEasy / results.size()) <= 0.2) {
                    var randomIndex = rand.nextInt(easyExercises.size());
                    var exercise = easyExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();
                    sumTime += (int) (middleChillInSec * countOfChill);
                    countOfChill += 0.5;
                    countEasy = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("ЛЕГКО"))).count();
                    easyExercises.remove(randomIndex);
                }
                if (!middleExercises.isEmpty() && (double) countEasy / results.size() > 0.2 && (double) countMiddle / results.size() <= 0.7) {
                    var randomIndex = rand.nextInt(middleExercises.size());
                    var exercise = middleExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();

                    sumTime += (int) (middleChillInSec * 2.2 * countOfChill);
                    countOfChill += 0.5;

                    countMiddle = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СРЕДНЕ"))).count();
                    middleExercises.remove(randomIndex);
                }
                if (!hardExercises.isEmpty() && (double) countEasy / results.size() > 0.2 && (double) countMiddle / results.size() > 0.7 && (double) countHard / results.size() <= 0.1) {
                    var randomIndex = rand.nextInt(hardExercises.size());
                    var exercise = hardExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();

                    sumTime += (int) (middleChillInSec * 3 * countOfChill);
                    countOfChill += 0.5;

                    countHard = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СЛОЖНО"))).count();
                    hardExercises.remove(randomIndex);
                }
                if (!(results.isEmpty() || ((double) countEasy / results.size()) <= 0.2) &&
                 !(results.isEmpty() ||(!middleExercises.isEmpty() && ((double) countEasy / results.size()) > 0.2 && ((double) countMiddle / results.size()) <= 0.7)) &&
                 ! (results.isEmpty() ||(!hardExercises.isEmpty() && ((double) countEasy / results.size()) > 0.2 && ((double) countMiddle / results.size()) > 0.7 && ((double) countHard / results.size()) <= 0.1))) break;
            }
            if (status.equals(Status.valueOf("СЛОЖНО"))) {
                if (easyExercises.isEmpty() && middleExercises.isEmpty() && hardExercises.isEmpty()) break;
                if (results.isEmpty() || (!easyExercises.isEmpty() && countEasy > 0 &&  ((double) countEasy / results.size()) <= 0.11)) {
                    var randomIndex = rand.nextInt(easyExercises.size());
                    var exercise = easyExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();

                    sumTime += (int) (hardChillInSec * countOfChill);
                    countOfChill += 0.5;

                    countEasy = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("ЛЕГКО"))).count();
                    easyExercises.remove(randomIndex);
                }
                if (!middleExercises.isEmpty() && (double) countEasy / results.size() > 0.1 && countEasy > 0 && (double) countMiddle / results.size() <= 0.3) {
                    var randomIndex = rand.nextInt(middleExercises.size());
                    var exercise = middleExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();

                    sumTime += (int) (hardChillInSec*2.3* countOfChill);
                    countOfChill += 0.5;

                    countMiddle = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СРЕДНЕ"))).count();
                    middleExercises.remove(randomIndex);
                }
                if (!hardExercises.isEmpty() && (double) countEasy / results.size() > 0.1 && countEasy > 0 && (double) countMiddle / results.size() > 0.3 && (double) countHard / results.size() <= 0.6) {
                    var randomIndex = rand.nextInt(hardExercises.size());
                    var exercise = hardExercises.get(randomIndex);
                    results.add(exercise);
                    sumTime += exercise.getDurationInSeconds();

                    sumTime += (int) (hardChillInSec * 3 * countOfChill);
                    countOfChill += 0.5;

                    countHard = results.stream().filter(a -> a.getStatus().equals(Status.valueOf("СЛОЖНО"))).count();
                    hardExercises.remove(randomIndex);
                }
                if (!(results.isEmpty() || (countEasy > 0 &&  ((double) countEasy / results.size()) <= 0.1)) &&
                !(results.isEmpty() || (!middleExercises.isEmpty() && ((double) countEasy / results.size()) > 0.1 && countEasy > 0 && ((double) countMiddle / results.size()) <= 0.3)) &&
                !(results.isEmpty() || (!hardExercises.isEmpty() && ((double) countEasy / results.size()) > 0.1  && countEasy > 0 && ((double) countMiddle / results.size()) > 0.3 && ((double) countHard / results.size()) <= 0.6))) break;
            }
        }
        return results;
    }
    
    public TrainDTO generateTrain(Users user, TrainsFilterDTO trainsFilterDTO) {
        var currentTrain = new Train();
        var coefByUserData = getCoefficient(user);
        var times = parseTime(trainsFilterDTO.getTimes());
        var category = trainsFilterDTO.getActivityCategories().toUpperCase();
        var format = trainsFilterDTO.getFormats().toUpperCase();
        var status = trainsFilterDTO.getStatus().toUpperCase();
        var exercisesByCategory = exercisesService.findAllByCategoryAndPlace(category, format);
//        var exercisesByCategory = exercisesService.findAllByCategory(category);
        var correctExercises = fillTrainExercises(exercisesByCategory, times, Status.valueOf(status));
        //сделал чтобы было количество повторов под пользователя
        correctExercises.forEach(exercise ->  exercise.setCountOfIteration(exercise.getCountOfIteration() * (int) Math.round(coefByUserData)));
        currentTrain = trainService.addCategory(currentTrain, trainsFilterDTO.getActivityCategories());
        currentTrain.setExercises(correctExercises);
        currentTrain.setPlace(trainsFilterDTO.getFormats());
        currentTrain.setDurationInMinutes(correctExercises.stream().map(Exercises::getDurationInSeconds).reduce(0, Integer::sum)/60);
        return trainService.converteToTrainDTO(currentTrain);
    }
}