package com.fithub.FitHub.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name="users")
@EqualsAndHashCode(of = {"name", "surname"})
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String login;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    private String skill;

    @Column(name = "count_of_trains")
    private Integer countOfTrains;

    @Column
    private Integer weight;

    @Column
    private Integer height;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
}
