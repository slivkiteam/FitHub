package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Status;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
public class TrainDTO {
    private String title;
    private Status status;
    private Integer score;
    private Integer used;
    private String author;
    private Set<ActivityCategories> categories;
}