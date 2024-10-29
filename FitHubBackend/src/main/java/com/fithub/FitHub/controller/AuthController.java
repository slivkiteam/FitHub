package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.AuthenticationDTO;
import com.fithub.FitHub.dto.UsersDTO;
import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.security.JWTUtil;
import com.fithub.FitHub.service.RegisterService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.UserNotFoundException;
import com.fithub.FitHub.validator.UsersValidator;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UsersValidator usersValidator;
    private final RegisterService registerService;
    private final JWTUtil jwtUtil;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UsersValidator usersValidator, RegisterService registerService, JWTUtil jwtUtil, ModelMapper modelMapper, AuthenticationManager authenticationManager) {
        this.usersValidator = usersValidator;
        this.registerService = registerService;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/registration")
    public Map<String ,String> registration(@RequestBody @Valid UsersDTO users, BindingResult bindingResult) {
        var user = createFromDTO(users);
        usersValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return Map.of("message", "exception!!!");
        }
        registerService.register(user);
        String token = jwtUtil.generateToken(user.getLogin());
        return Map.of("jwt-token", token);
    }

    @PostMapping("/login")
    public Map<String, String> performLogin(@RequestBody AuthenticationDTO authenticationDTO) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(authenticationDTO.getLogin(),
                        authenticationDTO.getPassword());
        try {
            authenticationManager.authenticate(authInputToken);
        } catch (BadCredentialsException e) {
            return Map.of("message", "Incorrect credentials!");
        }

        String token = jwtUtil.generateToken(authenticationDTO.getLogin());
        return Map.of("jwt-token", token);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(UserNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse("User with this id not found", System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    private Users createFromDTO(UsersDTO userDTO) {
        return modelMapper.map(userDTO, Users.class);
    }

    private UsersDTO convertToUsersDTO(Users user) {
        return modelMapper.map(user, UsersDTO.class);
    }
}
