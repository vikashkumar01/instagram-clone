package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmail(email);

        if(user.isEmpty()){
            throw new UsernameNotFoundException("Invalid credential");
        }
        return (UserDetails) user.get();
    }
}
