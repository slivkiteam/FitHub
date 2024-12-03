package com.fithub.FitHub.dto;

import com.fithub.FitHub.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

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
    private Integer age;
    private Role role;
    private List<Train> trains;
    private List<Rating> ratings;
    private UserStatistics userStatistics;
}
