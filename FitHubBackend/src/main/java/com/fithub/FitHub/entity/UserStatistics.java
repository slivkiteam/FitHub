package com.fithub.FitHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "users_statistics")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString(exclude = "user")
@EqualsAndHashCode(of = {"id", "skill"})
public class UserStatistics {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OneToOne()
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
