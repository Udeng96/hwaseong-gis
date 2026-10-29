package com.eseict.gis.controller.common;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.weather.WeatherInfoResult;
import com.eseict.gis.service.common.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/weather", produces = ApiConstant.API_PRODUCES)
public class WeatherController {

    private static final Logger logger = LoggerFactory.getLogger(ViewController.class);

    @Autowired
    WeatherService weatherService;

    @GetMapping("/info")
    public WeatherInfoResult getWeatherInfo (
            @RequestParam(value = "baseDate", defaultValue = "")String baseDate
    ) {

        return weatherService.getForecastList(baseDate);
    }

    @GetMapping("/report")
    public String getWeatherReport(
            @RequestParam(value = "baseDate", defaultValue = "")String baseDate
    ){

        return weatherService.getWeatherReport(baseDate);
    }

}
