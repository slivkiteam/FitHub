package com.fithub.FitHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@EqualsAndHashCode(of = "title")
@Table(name="exercises")
public class Exercises {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String title;
    @Column
    private String description;
    @Column(name = "duration_in_seconds")
    private Integer durationInSeconds;
    @Column(name="count_of_iteration")
    private Integer countOfIteration;
    @Column
    private String place;
    @Column
    private String goal;
    @Column
    private String inventory;
    @Column
    private Double weight;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private ActivityCategories category;

    @Builder.Default
    @JsonIgnore
    @ManyToMany(mappedBy = "exercises")
    private List<Train> trains = new ArrayList<>();
}
