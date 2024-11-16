package com.fithub.FitHub.filter;

import com.fithub.FitHub.entity.ActivityCategories;
import com.fithub.FitHub.entity.Train;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class TrainsSpecification implements Specification<Train> {

    private SpecSearchCriteria criteria ;
    public TrainsSpecification(SpecSearchCriteria specSearchCriteria) {
        this.criteria = specSearchCriteria;
    }

    @Override
    public Predicate toPredicate
            (Root<Train> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().equals("category")) {
            Join<Train, ActivityCategories> categories = root.join("category");
            return builder.equal(categories.get("category"), criteria.getValue());
        }
        if (criteria.getOperation().getOperator().equalsIgnoreCase(">")) {
            return builder.greaterThanOrEqualTo(
                    root.get(criteria.getKey()), criteria.getValue().toString());
        }
        else if (criteria.getOperation().getOperator().equalsIgnoreCase("<")) {
            return builder.lessThanOrEqualTo(
                    root.get(criteria.getKey()), criteria.getValue().toString());
        }
        else if (criteria.getOperation().getOperator().equalsIgnoreCase(":")) {
            if (root.get(criteria.getKey()).getJavaType() == String.class) {
                return builder.like(
                        root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
            } else {
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            }
        }
        return null;
    }
}