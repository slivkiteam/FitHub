package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.ExercisesDTO;
import com.fithub.FitHub.entity.Exercises;
import com.fithub.FitHub.repository.ExercisesRepository;
import com.fithub.FitHub.util.ExerciseNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ExercisesService {
    private final ExercisesRepository exercisesRepository;
    private final ActivityCategoriesService activityCategoriesService;
    private final ModelMapper modelMapper;
    @Autowired
    public ExercisesService(ExercisesRepository exercisesRepository, ActivityCategoriesService activityCategoriesService, ModelMapper modelMapper) {
        this.exercisesRepository = exercisesRepository;
        this.activityCategoriesService = activityCategoriesService;
        this.modelMapper = modelMapper;
    }

    public List<ExercisesDTO> findAll() {
        return exercisesRepository.findAll().stream().map(c -> modelMapper.map(c, ExercisesDTO.class)).toList();
    }

    public Exercises findById(Long id) {
        return exercisesRepository.findById(id).orElseThrow(ExerciseNotFoundException::new);
    }

    @Transactional
    public Exercises save(Exercises exercises) {
        var activityCategory = activityCategoriesService.needToSave(exercises.getCategory());
        exercises.setCategory(activityCategory);
        return exercisesRepository.save(exercises);
    }

    @Transactional
    public void update(Long id, Exercises exercises) {
        Exercises e = findById(id);
        exercises.setId(e.getId());
        exercisesRepository.save(exercises);
    }

    @Transactional
    public void delete(Long id) { exercisesRepository.deleteById(id); }

    public Exercises converteFromDTO(ExercisesDTO exercisesDTO) {
        return modelMapper.map(exercisesDTO, Exercises.class);
    }

    public ExercisesDTO converteToExerciseDTO(Exercises exercises) {
        return modelMapper.map(exercises, ExercisesDTO.class);
    }
    @Transactional
    public Exercises needToSave(Exercises exercise) {
        var isContain = exercisesRepository.findAll().stream().map(Exercises::getTitle).toList().contains(exercise.getTitle());
        if (!isContain) {
            return save(exercise);
        }
        exercise.setId(exercisesRepository.findByTitle(exercise.getTitle()).getId());
        return exercise;
    }
}
