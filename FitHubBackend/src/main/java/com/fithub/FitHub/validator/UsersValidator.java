package com.fithub.FitHub.validator;

import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UsersValidator implements Validator {
    private final UsersService usersService;

    @Autowired
    public UsersValidator(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Users.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Users user = (Users) target;
        if (usersService.findByLogin(user.getLogin()).isEmpty()) {
            return; //пользователь не найден
        }
        errors.rejectValue("login", "", "Login already exists");
    }
}
