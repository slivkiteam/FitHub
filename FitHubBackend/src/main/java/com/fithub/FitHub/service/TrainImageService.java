package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.TrainImageDTO;
import com.fithub.FitHub.entity.TrainImage;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class TrainImageService {

    private final ModelMapper modelMapper;

    public TrainImageService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public TrainImage createFromDTO(TrainImageDTO trainImageDTO) {
        return modelMapper.map(trainImageDTO, TrainImage.class);
    }
}
