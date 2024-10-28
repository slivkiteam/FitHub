package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.entity.Train;
import com.fithub.FitHub.service.TrainService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.TrainNotCreatedException;
import com.fithub.FitHub.util.TrainNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/trains")
public class TrainController {
    private final TrainService trainService;
    private final ModelMapper modelMapper;
    @Autowired
    public TrainController(TrainService trainService, ModelMapper modelMapper) {
        this.trainService = trainService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public List<TrainDTO> getAllTrains() {
        return trainService.findAll().stream().map(this::converteToTrainDTO).toList();
    }

    @GetMapping("/{id}")
    public TrainDTO getTrainById(@PathVariable Long id) {
        return converteToTrainDTO(trainService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createTrain(@RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        trainService.save(createFromDTO(trainDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> updateTrain(@PathVariable("id") Long id, @RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        trainService.update(id, createFromDTO(trainDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTrain(@PathVariable("id") Long id) {
//        checkErrors(bindingResult);
        trainService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private Train createFromDTO(TrainDTO trainDTO) {
        return modelMapper.map(trainDTO, Train.class);
    }

    private TrainDTO converteToTrainDTO(Train train) {
        return modelMapper.map(train, TrainDTO.class);
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