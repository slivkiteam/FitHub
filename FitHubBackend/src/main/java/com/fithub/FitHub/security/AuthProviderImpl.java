//package com.fithub.FitHub.security;
//
//
//import com.fithub.FitHub.repository.UsersRepository;
//import com.fithub.FitHub.service.UsersService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.util.Collection;
//import java.util.Collections;
//
//@Component
//public class AuthProviderImpl implements AuthenticationProvider {
//
//    private final UsersService usersService;
//
//    @Autowired
//    public AuthProviderImpl(UsersService usersService) {
//        this.usersService = usersService;
//    }
//
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        String username = authentication.getName();
//        UserDetails userDetails = usersService.loadUserByUsername(username);
//        String password = authentication.getCredentials().toString();
//        if (!userDetails.getPassword().equals(password))
//            throw new BadCredentialsException("Incorrect password");
//        return new UsernamePasswordAuthenticationToken(userDetails, password, Collections.EMPTY_LIST);
//    }
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return true;
//    }
//}
