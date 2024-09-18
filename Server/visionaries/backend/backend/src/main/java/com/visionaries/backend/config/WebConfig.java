package com.visionaries.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allows CORS for all endpoints
                .allowedOrigins("*") // Allows requests from any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allows specific HTTP methods
                .allowedHeaders("*") // Allows all headers
                .allowCredentials(true); // Allows credentials (like cookies)
    }
}