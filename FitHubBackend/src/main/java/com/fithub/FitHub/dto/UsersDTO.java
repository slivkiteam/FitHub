package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UsersDTO {
    private Long id;

    private String name;

    private String surname;

    private String login;

    private Date birthday;

    private String email;

    private String password;

    private Gender gender;

    private String skill;

    private Integer countOfTrains;

    private Integer weight;

    private Integer height;

    private String role;
}
