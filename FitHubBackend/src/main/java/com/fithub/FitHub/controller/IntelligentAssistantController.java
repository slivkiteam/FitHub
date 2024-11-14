package com.fithub.FitHub.controller;

import com.fithub.FitHub.dto.TrainDTO;
import com.fithub.FitHub.dto.TrainsFilterDTO;
import com.fithub.FitHub.security.UsersDetails;
import com.fithub.FitHub.service.IntelligentAssistantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@RequestMapping("/assistant")
public class IntelligentAssistantController {

    private final IntelligentAssistantService intelligentAssistantService;

    @Autowired
    public IntelligentAssistantController(IntelligentAssistantService intelligentAssistantService) {
        this.intelligentAssistantService = intelligentAssistantService;
    }

    @GetMapping
    public List<TrainDTO> getAllTrains() {
        return null;
    }

    @PostMapping("/generate")
    public TrainDTO generate(@RequestBody() TrainsFilterDTO trainsFilterDTO) {
        System.out.println(trainsFilterDTO);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();
        return intelligentAssistantService.generateTrain(usersDetails.getUser(), trainsFilterDTO);
    }
}
