package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.ExercisesDTO;
import com.fithub.FitHub.service.ExercisesService;
import com.fithub.FitHub.util.ExerciseNotCreatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/exercises")
public class ExercisesController {

    private final ExercisesService exercisesService;

    @Autowired
    public ExercisesController(ExercisesService exercisesService) {
        this.exercisesService = exercisesService;
    }

    @GetMapping
    public List<ExercisesDTO> getAllExercises() {
        return exercisesService.findAll();
    }

    @GetMapping("/{id}")
    public ExercisesDTO getExerciseById(@PathVariable("id") Long id) {
        return exercisesService.converteToExerciseDTO(exercisesService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createExercise(@RequestBody ExercisesDTO exercisesDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        exercisesService.save(exercisesService.converteFromDTO(exercisesDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> updateExercise(@PathVariable("id") Long id, @RequestBody ExercisesDTO exercisesDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        exercisesService.update(id, exercisesService.converteFromDTO(exercisesDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteExercise(@PathVariable("id") Long id) {
        //        checkErrors(bindingResult);
        exercisesService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private static void checkErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.append(error.getField()).append(" - ").append(error.getDefaultMessage()).append(";");
            }
            throw new ExerciseNotCreatedException(errors.toString());
        }
    }
}
