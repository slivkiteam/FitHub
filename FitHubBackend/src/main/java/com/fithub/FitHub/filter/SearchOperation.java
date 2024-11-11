package com.fithub.FitHub.filter;

public enum SearchOperation implements CharSequence {
    EQUALITY(":"),                // Операция равенства
    CONTAINS("*"),               // Операция содержит
    STARTS_WITH("^"),            // Операция начинается с
    ENDS_WITH("$"),              // Операция заканчивается на
    ZERO_OR_MORE_REGEX("*"),     // Регулярное выражение для 0 или более символов
    LESS_THEN("<"),
    MORE_THEN(">");

    private final String operator;

    SearchOperation(String operator) {
        this.operator = operator;
    }

    public String getOperator() {
        return operator;
    }

    public static SearchOperation getSimpleOperation(char input) {
        switch (input) {
            case ':':
                return EQUALITY;
            case '*':
                return CONTAINS;
            case '^':
                return STARTS_WITH;
            case '$':
                return ENDS_WITH;
            case '<':
                return LESS_THEN;
            case '>':
                return MORE_THEN;
            default:
                return null;
        }
    }

    @Override
    public int length() {
        return 0;
    }

    @Override
    public char charAt(int index) {
        return 0;
    }

    @Override
    public CharSequence subSequence(int start, int end) {
        return null;
    }
}