package com.fithub.FitHub.config;

//import com.fithub.FitHub.security.AuthProviderImpl;

import com.fithub.FitHub.service.UsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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

//@EnableAsync
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JWTFilter jwtFilter;
    private final UsersDetailsService userDetailsService;

    @Autowired
    public SecurityConfig(JWTFilter jwtFilter, UsersDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/admin").hasRole("ADMIN")
<<<<<<< HEAD
                        .requestMatchers("/hello", "/users/lk", "/assistant/generate").authenticated()
                        .requestMatchers("/auth/login", "/trains","/trains/**","/assistant", "/assistant/**","/users", "/users/**", "/auth/registration", "/showUserInfo").permitAll()
=======
                        .requestMatchers("/hello", "/users/lk").authenticated()
                        .requestMatchers("/auth/login", "/trains","/trains/**","/users", "/users/**", "/auth/registration", "/showUserInfo", "/ratings", "/ratings/**").permitAll()

>>>>>>> 0d6cebbf01878c05fb6e0bde347dd86401f9f510
                ).formLogin(form -> form
                        .loginPage("/auth/login")
                        .loginProcessingUrl("/process_login")
                        .defaultSuccessUrl("/trains",true)
                        .failureUrl("/auth/login?error").permitAll())
                .logout((logout) -> logout.logoutUrl("/logout").logoutSuccessUrl("/auth/login"))
                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
