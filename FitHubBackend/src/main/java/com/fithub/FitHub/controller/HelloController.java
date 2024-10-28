package com.fithub.FitHub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("/hello")
    public String getAllUsers() {
        return "hello";
    }
    @GetMapping("/admin")
    public String getAdmin() {
        return "admin";
    }
}
