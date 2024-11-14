package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.RatingDTO;
import com.fithub.FitHub.entity.Rating;
import com.fithub.FitHub.service.RatingService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.TrainNotCreatedException;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> addRating(@RequestBody RatingDTO ratingDTO , BindingResult bindingResult) {
        checkErrors(bindingResult);
        System.out.println("я был в методе addRating в контролере");
        Rating rating = ratingService.addRating(ratingDTO.getUsersId(), ratingDTO.getTrainsId(), ratingDTO.getScore(), ratingDTO.getFeedback());
        return ResponseEntity.ok(HttpStatus.CREATED);
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
    private ResponseEntity<ErrorResponse> handleException(TrainNotCreatedException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
