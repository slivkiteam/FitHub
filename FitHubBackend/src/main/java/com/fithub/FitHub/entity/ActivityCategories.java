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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name="category_name")
    private String category;

    @JsonIgnore
    @Builder.Default
    @ManyToMany(mappedBy = "categories")
//    @Cascade(org.hibernate.annotations.CascadeType.PERSIST)
    private Set<Train> trains = new HashSet<>();

    public void addTrain(Train train) {
        trains.add(train);
        train.getCategories().add(this);
    }
}
