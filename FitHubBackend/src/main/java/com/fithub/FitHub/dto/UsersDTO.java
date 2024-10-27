package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

import java.util.Date;

public class UsersDTO {
    private Long id;

    private String name;

    private String surname;

    private String patronymic;

    private Date birthday;

    private String email;

    private String password;

    private Gender gender;

    private String skill;

    private Integer countOfTrains;

    private Integer weight;

    private Integer height;
}
