package com.fithub.FitHub.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TrainImageDTO {
    @NotNull(message = "Image must be mot mull")
    private MultipartFile image;
}
