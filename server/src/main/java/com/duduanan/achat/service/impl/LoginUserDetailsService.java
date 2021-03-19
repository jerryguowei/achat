package com.duduanan.achat.service.impl;

import com.duduanan.achat.entity.UserInfo;
import com.duduanan.achat.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo existingUser = userRepository.findByUsername(username);

        if(existingUser != null) {
            UserDetails userDetails = new LoginUserDetails(existingUser);
            if(!userDetails.isEnabled()) {
                throw new DisabledException("user is disabled.");
            }
            return userDetails;
        }
        throw new InternalAuthenticationServiceException("username and password is invalid.");
    }
}
