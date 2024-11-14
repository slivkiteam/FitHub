package com.fithub.FitHub.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AverageRating {

    private int userCount;
    private double averageScore;
    private List<String> feedbacksAndUsersName = new ArrayList<>();
}
