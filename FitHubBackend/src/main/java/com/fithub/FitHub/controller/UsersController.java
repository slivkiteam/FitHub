package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.UsersDTO;
import com.fithub.FitHub.entity.Users;
import com.fithub.FitHub.service.UsersService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.UserNotCreatedException;
import com.fithub.FitHub.util.UserNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UsersController {

    private final UsersService usersService;
    private final ModelMapper modelMapper;

    @Autowired
    public UsersController(UsersService usersService, ModelMapper modelMapper) {
        this.usersService = usersService;
        this.modelMapper = modelMapper;
    }
    @GetMapping("/lk")
    public Users getUserItem() {
        return usersService.getCurrentUser();
    }
    @GetMapping
    public List<UsersDTO> getAllUsers() {
        return usersService.findAll().stream().map(this::convertToUsersDTO).toList();
    }

    @GetMapping("/{id}")
    public UsersDTO getUserById(@PathVariable("id") Long id) {
        return convertToUsersDTO(usersService.findById(id));
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createUser(@RequestBody UsersDTO userDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        usersService.save(createFromDTO(userDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> updateUser(@PathVariable("id") Long id, @RequestBody UsersDTO userDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        usersService.update(id, createFromDTO(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        usersService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private Users createFromDTO(UsersDTO userDTO) {
        return modelMapper.map(userDTO, Users.class);
    }

    private UsersDTO convertToUsersDTO(Users user) {
        return modelMapper.map(user, UsersDTO.class);
    }

    private static void checkErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.append(error.getField()).append(" - ").append(error.getDefaultMessage()).append(";");
            }
            throw new UserNotCreatedException(errors.toString());
        }
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(UserNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse("User with this id not found", System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<ErrorResponse> handleException(UserNotCreatedException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
