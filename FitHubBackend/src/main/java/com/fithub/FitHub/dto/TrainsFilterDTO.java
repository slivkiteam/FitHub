package com.fithub.FitHub.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class TrainsFilterDTO {
    @JsonProperty("время")
    private List<String> times;

    @JsonProperty("тип тренировки")
    private List<String> activityCategories;

    @JsonProperty("уровень сложности")
    private List<String> status;

    @JsonProperty("формат")
    private List<String> formats;
}
