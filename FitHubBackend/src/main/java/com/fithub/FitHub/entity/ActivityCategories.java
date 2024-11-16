package com.fithub.FitHub.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name="activity_categories", uniqueConstraints = @UniqueConstraint(columnNames = {"category_name"}))
@ToString(exclude = "trains")
@EqualsAndHashCode(of = "category")
public class ActivityCategories {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name="category_name", unique = true)
    private String category;

//    @Column
//    private Double difficulty;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "category")
    private Set<Train> trains = new HashSet<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "category")
    private Set<Train> exercises = new HashSet<>();
}