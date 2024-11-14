package com.fithub.FitHub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDTO {
    private Long usersId;
    private Long trainsId;
    private int score;
    private String feedback;
}
