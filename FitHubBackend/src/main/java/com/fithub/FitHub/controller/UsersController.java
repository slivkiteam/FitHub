package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.ImageDTO;
import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.dto.UsersDTO;
import com.fithub.FitHub.entity.Image;
import com.fithub.FitHub.service.ImageService;
import com.fithub.FitHub.service.TrainService;
import com.fithub.FitHub.service.UsersService;
import com.fithub.FitHub.util.ErrorResponse;
import com.fithub.FitHub.util.UserNotCreatedException;
import com.fithub.FitHub.util.UserNotFoundException;
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
    private final TrainService trainService;
    private final ImageService userImageService;
    @Autowired
    public UsersController(UsersService usersService, TrainService trainService, ImageService userImageService) {
        this.usersService = usersService;
        this.trainService = trainService;
        this.userImageService = userImageService;
    }

    @GetMapping("/lk")
    public UsersDTO getUserItem() {
        return usersService.getUserAuthDTO();
    }

    @GetMapping
    public List<UsersDTO> getAllUsers() {
        return usersService.findAll();
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) {
        return usersService.getUrlByUserId(id);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<HttpStatus> uploadImage(@PathVariable("id") Long id, @ModelAttribute ImageDTO userImageDTO) {
        Image userImage = userImageService.createFromDTO(userImageDTO);
        usersService.uploadImage(id, userImage);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public UsersDTO getUserById(@PathVariable("id") Long id) {
        return usersService.findUserDTO(id);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createUser(@RequestBody UsersDTO userDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        usersService.save(usersService.createFromDTO(userDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/addTrain")
    public ResponseEntity<HttpStatus> addTrainUser(@PathVariable("id") Long id, @RequestBody TrainDTO trainDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        var train = trainService.needToSave(trainService.createFromDTO(trainDTO));
        usersService.addTrains(id, train);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> updateUser(@PathVariable("id") Long id, @RequestBody UsersDTO userDTO, BindingResult bindingResult) {
        checkErrors(bindingResult);
        usersService.update(id, usersService.createFromDTO(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        usersService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
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
