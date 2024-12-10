//package com.fithub.FitHub.config;
//
//import com.fithub.FitHub.props.MinioProperties;
//import io.minio.MinioClient;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Lazy;
//
//@Configuration
////@EnableWebMvcSecurity
////@EnableGlobalMethodSecurity(prePostEnabled = true)
//@RequiredArgsConstructor(onConstructor = @__(@Lazy))
//public class ApplicationConfig {
//
//    private final MinioProperties minioProperties;
//
//    @Bean
//    public MinioClient minioClient() {
//        return MinioClient.builder()
//                .endpoint(minioProperties.getUrl())
//                .credentials(minioProperties.getAccessKey(), minioProperties.getSecretKey())
//                .build();
//    }
//}
