package com.duduanan.achat.config;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	 @Value("${achat.chat-file-folder}")
	 private String chatFileFolder;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/files/**")
		.addResourceLocations("file:///" + chatFileFolder)
		.setCacheControl(CacheControl.maxAge(Duration.ofDays(1)));
	}
	
	

}
