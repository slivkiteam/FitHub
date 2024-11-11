package com.fithub.FitHub.filter;

import com.fithub.FitHub.entity.Train;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class TrainsSpecification implements Specification<Train> {

    private SpecSearchCriteria criteria ;
    public TrainsSpecification(SpecSearchCriteria specSearchCriteria) {
        this.criteria = specSearchCriteria;
    }

    @Override
    public Predicate toPredicate
            (Root<Train> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
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