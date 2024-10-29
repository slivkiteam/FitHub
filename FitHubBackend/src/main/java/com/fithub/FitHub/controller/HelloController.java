package com.fithub.FitHub.controller;

import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.security.UsersDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String getAllUsers() {
        return "hello";
    }

    @GetMapping("/showUserInfo")
    public Users showUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();
        return usersDetails.getUser();
    }
    @GetMapping("/admin")
    public String getAdmin() {
        return "admin";
    }
}
