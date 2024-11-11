package com.fithub.FitHub.filter;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class TrainsSpecificationsBuilder {

    private final List<SpecSearchCriteria> params;

    public TrainsSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    public final TrainsSpecificationsBuilder with(String key, String operation, Object value,
                                                  String prefix, String suffix) {
        return with(false, key, operation, value, prefix, suffix);
    }

    public final TrainsSpecificationsBuilder with(boolean orPredicate, String key, String operation,
                                                  Object value, String prefix, String suffix) {
        SearchOperation op = SearchOperation.getSimpleOperation(operation.charAt(0));
        if (op != null) {
            if (op == SearchOperation.EQUALITY) { // the operation may be complex operation
                boolean startWithAsterisk = prefix != null && prefix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
                boolean endWithAsterisk = suffix != null && suffix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
                if (startWithAsterisk && endWithAsterisk) {
                    op = SearchOperation.CONTAINS;
                } else if (startWithAsterisk) {
                    op = SearchOperation.ENDS_WITH;
                } else if (endWithAsterisk) {
                    op = SearchOperation.STARTS_WITH;
                }
            }
        }
        var b = params.stream().filter(a -> a.getKey().equals(key)).findAny();
        if (b.isPresent())
        {
//            var regex = "^(0|[1-9]\\d{0,9}|1[0-9]{0,9}|2[0-1]{0,1}[0-4]{0,1}[0-7]{0,1}[0-7]{0,1}[0-9]{0,1})$";
//            if (b.get().getValue().toString().matches(regex))
//                params.add(new SpecSearchCriteria(false, key, op, value));
            params.add(new SpecSearchCriteria(true, key, op, value));
        }
        else params.add(new SpecSearchCriteria(orPredicate, key, op, value));
        return this;
    }

    public Specification build() {
        if (params.size() == 0) return null;
        Specification result = new TrainsSpecification(params.get(0));
        for (int i = 1; i < params.size(); i++) {
            result = params.get(i).isOrPredicate()
                    ? Specification.where(result).or(new TrainsSpecification(params.get(i)))
                    : Specification.where(result).and(new TrainsSpecification(params.get(i)));
        }
        return result;
    }
}