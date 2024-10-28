package com.fithub.FitHub.controller;

import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.service.RegisterService;
import com.fithub.FitHub.validator.UsersValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {
    private final UsersValidator usersValidator;
    private final RegisterService registerService;

    @Autowired
    public AuthController(UsersValidator usersValidator, RegisterService registerService) {
        this.usersValidator = usersValidator;
        this.registerService = registerService;
    }

    @GetMapping("/login")
    @PreAuthorize("")
    public String  loginPage() {

        return "/auth/login";
    }
    @GetMapping("/registration")
    public String registerPage(@ModelAttribute("user") @Valid Users user) {
        return "/auth/registration";
    }
    @PostMapping("/registration")
    public String registration(@ModelAttribute("user") @Valid Users user, BindingResult bindingResult) {

        usersValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "/auth/registration";
        }
        registerService.register(user);
        return "redirect:/auth/login";
    }
}
