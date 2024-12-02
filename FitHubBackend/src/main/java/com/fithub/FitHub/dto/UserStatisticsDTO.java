package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.Skill;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatisticsDTO {
    private Long id;
    private Skill skill;
    private Integer countOfTrains;
    private Integer weight;
    private Integer height;
    private Double IBW;
}
