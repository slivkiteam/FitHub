package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.ExercisesDTO;
import com.fithub.FitHub.dto.ImageDTO;
import com.fithub.FitHub.dto.RatingDTO;
import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.entity.AverageRating;
import com.fithub.FitHub.entity.Image;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.filter.TrainsSpecificationsBuilder;
import com.fithub.FitHub.security.UsersDetails;
import com.fithub.FitHub.service.ExercisesService;
import com.fithub.FitHub.service.ImageService;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController()
@RequestMapping("/trains")
public class TrainController {

    private final TrainService trainService;
    private final ExercisesService exercisesService;
    private final RatingService ratingService;
    private final ImageService trainImageService;
    @Autowired
    public TrainController(TrainService trainService, ExercisesService exercisesService, RatingService ratingService, ImageService trainImageService) {
        this.trainService = trainService;
        this.exercisesService = exercisesService;
        this.ratingService = ratingService;
        this.trainImageService = trainImageService;
    }

    @GetMapping
    public Page<TrainDTO> search(@RequestParam(value = "page", required = false) Integer page,
                                 @RequestParam(value = "sort", required = false) String typeOfSort,
                                 @RequestParam(value = "search", required = false) String search) {
        TrainsSpecificationsBuilder builder = new TrainsSpecificationsBuilder();
        Pattern pattern = Pattern.compile("([\\w+]+?)(:|<|>)([^,]+),?", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            var thirdGroup = matcher.group(3).contains("час") ? matcher.group(3) + "+" : matcher.group(3);
            builder.with(matcher.group(1), matcher.group(2), thirdGroup.replaceAll(" {2}", " "), null, null);
        }
        Specification<Train> spec = builder.build();
        return trainService.findAll(spec, page, typeOfSort);
    }

    @GetMapping("/{id}")
    public TrainDTO getTrainById(@PathVariable Long id) {
        return trainService.converteToTrainDTO(trainService.findById(id));
    }
    @GetMapping("/top")
    public List<TrainDTO> getTopTrain() {
        return trainService.getTopThree().stream().map(trainService::converteToTrainDTO).toList();
    }

    @PostMapping
    public Long createTrain(@RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        var t = trainService.save(trainService.createFromDTO(trainDTO));
        return t.getId();
    }

    @PostMapping("/{id}/addRating")
    public ResponseEntity<HttpStatus> addRating(@PathVariable("id") Long id, @RequestBody RatingDTO ratingDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();
        ratingService.addRating(usersDetails.getUser().getId(), id, ratingDTO.getScore(), ratingDTO.getFeedback());
        return ResponseEntity.ok(HttpStatus.CREATED);
//        Rating rating = ratingService.addRating(ratingDTO.getUsersId(), ratingDTO.getTrainsId(), ratingDTO.getScore(), ratingDTO.getFeedback());//        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) {
        return trainService.getUrlByTrainId(id);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<HttpStatus> uploadImage(@PathVariable("id") Long id, @ModelAttribute ImageDTO trainImageDTO) {
        Image trainImage = trainImageService.createFromDTO(trainImageDTO);
        trainService.uploadImage(id, trainImage);
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