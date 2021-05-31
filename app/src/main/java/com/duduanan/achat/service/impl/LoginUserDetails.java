package com.duduanan.achat.service.impl;

import com.duduanan.achat.entity.UserInfo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class LoginUserDetails implements UserDetails {

    private static final long serialVersionUID = 2269408625117891569L;
    private String password;
    private String username;
    private boolean active;
    private List<GrantedAuthority> authorities = new ArrayList<>();

    {
        authorities.add(new SimpleGrantedAuthority("USER_ROLE"));
    }

    public LoginUserDetails(UserInfo userInfo){
        this.password = userInfo.getPassword();
        this.username = userInfo.getUsername();
        this.active = userInfo.isActive();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
