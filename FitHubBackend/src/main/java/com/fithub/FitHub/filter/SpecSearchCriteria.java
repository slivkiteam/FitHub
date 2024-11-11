package com.fithub.FitHub.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpecSearchCriteria {
    private boolean orPredicate;
    private String key;
    private SearchOperation operation;
    private Object value;
}