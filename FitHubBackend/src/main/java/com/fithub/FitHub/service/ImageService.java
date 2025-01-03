package com.fithub.FitHub.service;

import com.fithub.FitHub.entity.TrainImage;
import com.fithub.FitHub.props.MinioProperties;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ImageService {
    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    @Autowired
    public ImageService(MinioClient minioClient, MinioProperties minioProperties) {
        this.minioClient = minioClient;
        this.minioProperties = minioProperties;
    }

    public String upload(TrainImage image) {
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

    @SneakyThrows
    public String getPresignedUrl(String objectName) {
        try {
            int expiry = 60 * 60; // 1 час
            return minioClient.getPresignedObjectUrl(io.minio.GetPresignedObjectUrlArgs.builder()
                    .bucket(minioProperties.getBucket())
                    .object(objectName)
                    .method(Method.GET)
                    .expiry(expiry, TimeUnit.SECONDS)
                    .build());
        } catch (MinioException | IOException e) {
            throw new RuntimeException("Error while generating presigned URL", e);
        }
    }
}
