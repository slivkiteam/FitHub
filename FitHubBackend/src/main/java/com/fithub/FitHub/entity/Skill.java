package com.fithub.FitHub.entity;

import lombok.Getter;

@Getter
public enum Skill {
    GOD_OF_WAR(3.0, 50),
    PRO(2.0, 35),
    HIGH(1.5, 25),
    MEDIUM(1.2, 18),
    STANDARD(1, 10),
    BEGINNER(0.8, 5),
    LOW(0.5, 0);

    private final double coefficient;

    private final int countTrainsForGetSkill;

    public static Skill getPrewiosSkill(Skill skill) {
        return Skill.values()[(skill.ordinal() - 1)];
    }
    public static Skill getNextSkill(Skill skill) {
        return (!skill.equals(GOD_OF_WAR)) ? Skill.values()[(skill.ordinal() + 1)] : GOD_OF_WAR;
    }
    Skill(double coefficient, Integer countTrainsForGetSkill) {
        this.coefficient = coefficient;
        this.countTrainsForGetSkill = countTrainsForGetSkill;
    }
}