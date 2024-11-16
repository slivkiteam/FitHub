package com.fithub.FitHub.entity;

public enum Status {
    СЛОЖНО(3.0),
    ЛЕГКО(1.0),
    СРЕДНЕ(2.0);

    private final double coefficient;

    Status(double coefficient) {
        this.coefficient = coefficient;
    }

    public double getCoefficient() {
        return coefficient;
    }
}