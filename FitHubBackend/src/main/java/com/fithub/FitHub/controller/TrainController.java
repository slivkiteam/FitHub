package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.ExercisesDTO;
import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.AverageRating;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.filter.TrainsSpecificationsBuilder;
import com.fithub.FitHub.service.ExercisesService;
import com.fithub.FitHub.service.RatingService;
import com.fithub.FitHub.service.TrainService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.TrainNotCreatedException;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController()
@RequestMapping("/trains")
public class TrainController {
    private final TrainService trainService;
    private final ExercisesService exercisesService;
    private final RatingService ratingService;

    @Autowired
    public TrainController(TrainService trainService, ExercisesService exercisesService, RatingService ratingService) {
        this.trainService = trainService;
        this.exercisesService = exercisesService;
        this.ratingService = ratingService;
    }

    @GetMapping()
    public Page<TrainDTO> search(@RequestParam(value = "page", required = false) Integer page,
                                 @RequestParam(value = "sort", required = false) String typeOfSort,
                                 @RequestParam(value = "search", required = false) String search) {
        TrainsSpecificationsBuilder builder = new TrainsSpecificationsBuilder();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)([^,]+),?", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3), null, null);
        }
        Specification<Train> spec = builder.build();
        return trainService.findAll(spec, page, typeOfSort);
    }

    @GetMapping("/{id}")
    public TrainDTO getTrainById(@PathVariable Long id) {
        return trainService.converteToTrainDTO(trainService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createTrain(@RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        trainService.save(trainService.createFromDTO(trainDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/addExercises")
    public ResponseEntity<HttpStatus> addExerciseTrain(@PathVariable("id") Long id, @RequestBody ExercisesDTO exercisesDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        var exercise = exercisesService.needToSave(exercisesService.converteFromDTO(exercisesDTO));
        trainService.addExercises(id, exercise);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> updateTrain(@PathVariable("id") Long id, @RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        trainService.update(id, trainService.createFromDTO(trainDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTrain(@PathVariable("id") Long id) {
        //        checkErrors(bindingResult);
        trainService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}/averageRating")
    public ResponseEntity<AverageRating> getAverageRating(@PathVariable Long id) {
        AverageRating averageRating = ratingService.calculateAverageRating(id);
        return ResponseEntity.ok(averageRating);
    }

    private static void checkErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.append(error.getField()).append(" - ").append(error.getDefaultMessage()).append(";");
            }
            throw new TrainNotCreatedException(errors.toString());
        }
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(TrainNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse("Train with this id not found", System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(TrainNotCreatedException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}