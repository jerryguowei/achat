package com.duduanan.achat.config;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.duduanan.achat.service.impl.LoginUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@Order(10)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private LoginUserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
       
        //.requestMatchers().antMatchers("/actuator/*", "user/register" )
    	 http.authorizeRequests().antMatchers("/api/user/register", "/*", "/actuator/*", "/static/**", "/manifest.json", "/files/**" ).permitAll()
                .and().authorizeRequests().anyRequest().authenticated()
                .and().csrf().disable().httpBasic()
                .authenticationEntryPoint(customBasicAuthenticationEntryPoint()).and()
                .rememberMe(r -> r.alwaysRemember(true).key("this is test"));
    	 		//for production, we need to put this key in a safe area instead of storing it in the code.
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
	protected UserDetailsService userDetailsService() {
		return userDetailsService;
	}

	@Bean
    public AuthenticationEntryPoint customBasicAuthenticationEntryPoint() {
        return new AuthenticationEntryPoint() {
            private ObjectMapper objectMapper = new ObjectMapper();

            @Override
            public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
                    throws IOException {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                Map<String, Object> errorAttributes = new LinkedHashMap<>();
                errorAttributes.put("timestamp", new Date());
                errorAttributes.put("status", response.getStatus());
                errorAttributes.put("message", authException.getMessage());
                response.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                response.getOutputStream().println(objectMapper.writeValueAsString(errorAttributes));
            }
        };
    }
}
