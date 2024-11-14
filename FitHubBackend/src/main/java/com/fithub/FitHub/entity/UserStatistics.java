package com.fithub.FitHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
@Entity
@Table(name = "users_statistics")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString()
@EqualsAndHashCode
public class UserStatistics implements Serializable {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    @Column
    @Enumerated(EnumType.STRING)
    private Skill skill;

    @Column(name = "count_of_trains")
    private Integer countOfTrains;
    @Column
    private Integer weight;
    @Column
    private Double IBW;
    @Column
    private Integer height;
}
