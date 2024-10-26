package com.fithub.FitHub.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

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
@ToString(exclude = "categories")
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private Integer score;
    @Column
    private Integer used;
    @Column
    private String author;
    @Builder.Default
    @ManyToMany
    @JoinTable(name = "trains_activity_categories",
                joinColumns = @JoinColumn(name = "train_id"),
                inverseJoinColumns = @JoinColumn(name = "category_id"))
//    @Cascade(org.hibernate.annotations.CascadeType.PERSIST)
    private Set<ActivityCategories> categories = new HashSet<>();

    public void addCategories(ActivityCategories category) {
        categories.add(category);
        category.getTrains().add(this);
    }
}