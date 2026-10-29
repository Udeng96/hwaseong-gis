package com.eseict.gis.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.*;

@Component
@EnableWebMvc
@EnableAsync
@ComponentScan(basePackages = "com.eseict")
public class DispatcherServletConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {WebMvcConfigurer.super.addCorsMappings(registry);}

    @Override
    public void addInterceptors(InterceptorRegistry registry) { WebMvcConfigurer.super.addInterceptors(registry);}


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/assets").resourceChain(true);
        registry.addResourceHandler("/vite.svg").addResourceLocations("classpath:/static/assets").resourceChain(true);
        registry.addResourceHandler("/**").addResourceLocations("classpath:/resources/");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/assets");
    }
}
