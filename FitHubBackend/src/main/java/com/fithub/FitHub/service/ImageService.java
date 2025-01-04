package com.fithub.FitHub.service;

import com.fithub.FitHub.dto.ImageDTO;
import com.fithub.FitHub.entity.Image;
import com.fithub.FitHub.props.MinioProperties;
import io.minio.*;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class ImageService {
    private final MinioClient minioClient;
    private final MinioProperties minioProperties;
    private final ModelMapper modelMapper;

    @Autowired
    public ImageService(MinioClient minioClient, MinioProperties minioProperties, ModelMapper modelMapper) {
        this.minioClient = minioClient;
        this.minioProperties = minioProperties;
        this.modelMapper = modelMapper;
    }

    public Image createFromDTO(ImageDTO ImageDTO) {
        return modelMapper.map(ImageDTO, Image.class);
    }

    public String upload(Image image) {
        try {
            System.out.println("Checking if bucket exists or creating bucket...");
            createBucket();
        } catch (Exception e) {
            throw new RuntimeException("Error creating bucket", e);
        }
        MultipartFile file = image.getImage();
        if (file.isEmpty() || file.getOriginalFilename() == null || file.getOriginalFilename().length() == 0) {
            throw new RuntimeException("Error withount image file");
        }
        String fileName = generateFileName(file);
        InputStream inputStream;
        try {
            inputStream = file.getInputStream();
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);
        }
        saveImage(inputStream, fileName);
        return fileName;
    }

    @SneakyThrows
    private void createBucket() {
        boolean found = false;
        System.out.println("Checking if bucket exists...");
        found = minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(minioProperties.getBucket())
                .build());
        System.out.println("Bucket exists: " + found);
        if (!found) {
            System.out.println("Creating bucket...");
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(minioProperties.getBucket())
                    .build());
            System.out.println("created bucket");
        }
    }

    private String generateFileName(MultipartFile file) {
        String extension = getExtension(file);
        return "%s%s%s".formatted(UUID.randomUUID(), ".", extension);
    }

    private String getExtension(MultipartFile file) {
        return file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
    }

    @SneakyThrows
    private void saveImage(InputStream inputStream, String fileName) {
        minioClient.putObject(PutObjectArgs.builder()
                    .stream(inputStream, inputStream.available(), -1)
                    .bucket(minioProperties.getBucket())
                    .object(fileName)
                    .build());
    }

    public ResponseEntity<byte[]> previewImage(String imageName) {
        try (InputStream inputStream = getImage(minioProperties.getBucket(), imageName)) {
            byte[] imageBytes = inputStream.readAllBytes();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/png")
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @SneakyThrows
    public InputStream getImage(String bucketName, String objectName) {
        return minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .build());
    }
}
