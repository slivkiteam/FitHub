package com.fithub.FitHub.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class TrainNotCreatedException extends RuntimeException {
    public TrainNotCreatedException(String message) {
        super(message);
    }
}
