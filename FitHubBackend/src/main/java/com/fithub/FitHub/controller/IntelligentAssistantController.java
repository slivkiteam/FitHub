package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.dto.TrainsFilterDTO;
import com.fithub.FitHub.service.IntelligentAssistantService;
import com.fithub.FitHub.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@RequestMapping("/assistant")
public class IntelligentAssistantController {

    private final IntelligentAssistantService intelligentAssistantService;
    private final UsersService usersService;

    @Autowired
    public IntelligentAssistantController(IntelligentAssistantService intelligentAssistantService, UsersService usersService) {
        this.intelligentAssistantService = intelligentAssistantService;
        this.usersService = usersService;
    }

    @GetMapping
    public List<TrainDTO> getAllTrains() {
        return null;
    }

    @PostMapping("/generate")
    public TrainDTO generate(@RequestBody() TrainsFilterDTO trainsFilterDTO) {
        var user = usersService.createFromDTO(usersService.getUserAuthDTO());
        return intelligentAssistantService.generateTrain(user, trainsFilterDTO);
    }
}