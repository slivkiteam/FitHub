package com.fithub.FitHub.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TrainImage {

    private MultipartFile image;
}
