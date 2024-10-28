package com.fithub.FitHub.config;

//import com.fithub.FitHub.security.AuthProviderImpl;

import com.fithub.FitHub.service.UsersDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
//@EnableAsync
public class SecurityConfig {

//    private final AuthProviderImpl authProvider;
//    @Autowired
//    public SecurityConfig(AuthProviderImpl authProvider) {
//        this.authProvider = authProvider;
//    }

    private final UsersDetailsService userDetailsService;

    @Autowired
    public SecurityConfig(UsersDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(authz -> authz
                        .requestMatchers("/admin").hasRole("ADMIN").requestMatchers("/hello", "/users/lk").authenticated()
                        .requestMatchers("/auth/login", "/trains","/trains/*","/users", "/users/*", "/auth/registration").permitAll()
                ).formLogin(form -> form.loginPage("/auth/login").loginProcessingUrl("/process_login").defaultSuccessUrl("/trains",true).failureUrl("/auth/login?error").permitAll())
                .logout((logout) -> logout.logoutUrl("/logout").logoutSuccessUrl("/auth/login")).build();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
