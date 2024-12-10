package com.fithub.FitHub.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name="trains")
@EqualsAndHashCode(of = "title")
@ToString(exclude = "category")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String title;
    @Column
    private String description;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private Integer used;
    @Column(name="duration_in_minutes")
    private Integer durationInMinutes;
    @Column(name="duration_in_minutes_text")
    private String durationInMinutesText;
    @Column
    private Integer countOfIteration;
    @Column
    private String author;
    @Column
    private String place;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private ActivityCategories category;

    @Builder.Default
    @JsonIgnore
    @ManyToMany(mappedBy = "trains")
    private List<Users> users = new ArrayList<>();

    @Builder.Default
    @ManyToMany
    @JoinTable(
            name = "trains_exercises",
            joinColumns = @JoinColumn(name = "train_id"),
            inverseJoinColumns = @JoinColumn(name = "exercises_id")
    )
    private List<Exercises> exercises = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "train")
    private Set<Rating> ratings = new HashSet<>();

    @Column
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String image;
}