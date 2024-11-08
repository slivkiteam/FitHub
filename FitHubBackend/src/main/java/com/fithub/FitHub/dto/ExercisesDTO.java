package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Train;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExercisesDTO {
    private Long id;
    private String title;
    private String description;
    private Integer durationInSeconds;
    private Integer countOfIteration;
    private String place;
    private String goal;
    private String inventory;
    private Double weight;
    private ActivityCategories category;
    private List<Train> trains;
}
