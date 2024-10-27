package com.fithub.FitHub.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name="activity_categories")
@ToString(exclude = "trains")
@EqualsAndHashCode(of = "category")
public class ActivityCategories {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name="category_name")
    private String category;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "category")
    private Set<Train> trains = new HashSet<>();
}