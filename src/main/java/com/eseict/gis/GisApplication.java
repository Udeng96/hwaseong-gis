package com.eseict.gis;

import com.eseict.gis.config.VWorldApSystemProperties;
import com.eseict.gis.config.VWorldApiProperties;
import com.eseict.gis.config.YamlPropertySourceFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@EnableConfigurationProperties({VWorldApiProperties.class, VWorldApSystemProperties.class})
@PropertySources({
        @PropertySource(value = "file:${GIS_HOME}/application.yml", factory = YamlPropertySourceFactory.class)
})
public class GisApplication {

    public static void main(String[] args) {
        SpringApplication.run(GisApplication.class, args);
    }

}
