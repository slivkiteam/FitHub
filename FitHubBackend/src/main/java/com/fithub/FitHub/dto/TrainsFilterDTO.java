package com.fithub.FitHub.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class TrainsFilterDTO {
    @JsonProperty("время")
    private String times;

    @JsonProperty("тип тренировки")
    private String activityCategories;

    @JsonProperty("уровень сложности")
    private String status;

    @JsonProperty("формат")
    private String formats;
}