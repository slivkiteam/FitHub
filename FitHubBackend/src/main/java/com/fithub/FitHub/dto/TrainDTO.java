package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Exercises;
import com.fithub.FitHub.entity.Status;
import com.fithub.FitHub.entity.Users;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class TrainDTO {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private Integer used;
    private Integer durationInMinutes;
    private String durationInMinutesText;
    private Integer countOfIteration;
    private String author;
    private String place;
    private String image;
    private ActivityCategories category;
    private List<Users> users;
    private List<Exercises> exercises;
}
