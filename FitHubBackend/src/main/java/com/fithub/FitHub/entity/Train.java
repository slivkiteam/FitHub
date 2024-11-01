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
@ToString(exclude = "category")
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
    @Column(name="duration_in_mitutes")
    private Integer durationInMinutes;
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
}