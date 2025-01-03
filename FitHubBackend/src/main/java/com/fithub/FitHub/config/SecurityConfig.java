package com.fithub.FitHub.config;

//import com.fithub.FitHub.security.AuthProviderImpl;

import com.fithub.FitHub.props.MinioProperties;
import com.fithub.FitHub.service.UsersDetailsService;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableAsync
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig implements WebMvcConfigurer {

    private final JWTFilter jwtFilter;
    private final MinioProperties minioProperties;
    private final UsersDetailsService userDetailsService;


    @Autowired
    public SecurityConfig(JWTFilter jwtFilter, MinioProperties minioProperties, UsersDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.minioProperties = minioProperties;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults()) // Включение CORS
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/hello", "/users/lk", "/assistant/generate").authenticated()
                        .requestMatchers("/auth/login", "/trains", "/trains/**", "/assistant", "/assistant/**", "/users", "/users/**", "/auth/registration", "/showUserInfo", "/ratings", "/ratings/**", "/exercises", "/exercises/**").permitAll()
                )
                .formLogin(form -> form
                        .loginPage("/auth/login")
                        .loginProcessingUrl("/process_login")
                        .defaultSuccessUrl("/trains", true)
                        .failureUrl("/auth/login?error").permitAll())
                .logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/auth/login"))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:9000", "http://localhost:9090", "http://127.0.0.1:9000", "http://127.0.0.1:9090", "http://172.18.0.2:9000","http://172.18.0.2:9090")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowedMethods("*");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint("http://localhost:9000")
                .credentials("minioadmin", "minioadmin")
                .build();
    }
}