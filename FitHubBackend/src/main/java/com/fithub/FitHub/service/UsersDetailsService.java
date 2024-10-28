package com.fithub.FitHub.service;

import com.fithub.FitHub.repository.UsersRepository;
import com.fithub.FitHub.security.UsersDetails;
import com.fithub.FitHub.util.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class UsersDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    @Autowired
    public UsersDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        var user = usersRepository.findByLogin(login).orElseThrow(UserNotFoundException::new);
        return new UsersDetails(user);
    }
}
