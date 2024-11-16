package com.fithub.FitHub.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @Column(unique = true)
    private String login;

    @Column
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    @Transient
    private Integer age;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private UserStatistics userStatistics;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder.Default
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "users_trains",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "trains_id")
    )
    private List<Train> trains = new ArrayList<>();
}