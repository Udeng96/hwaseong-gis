package com.eseict.gis.service.common;


import com.localhostmon.datetime.DateTimeUtil;
import com.localhostmon.net.http.HttpConnection;
import com.localhostmon.net.http.HttpConnectionException;
import com.eseict.gis.domain.dto.weather.*;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class WeatherService {

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);


    @Value("${weather.info.url}")
    private String infoUrl;

    @Value("${weather.info.key}")
    private String infoKey;

    @Value("${weather.report.url}")
    private String reportUrl;

    @Value("${weather.report.key}")
    private String reportKey;

    public WeatherInfoResult getForecastList(String baseDate) {

        WeatherInfoResult infoResult = new WeatherInfoResult();

        LocalDateTime currentTime = LocalDateTime.now(); //현재 시간
        LocalDateTime oneHourBefore = currentTime.minusHours(1); // 한시간 전


        // 시간 부분(Hour)만 가져오기
        DateTimeFormatter hourFormatter = DateTimeFormatter.ofPattern("HH");
        String oneHourBeforeStr = oneHourBefore.format(hourFormatter);
        String nowHourStr = currentTime.format(hourFormatter);

        String baseTime = oneHourBeforeStr+"30";


        //초단기 예보
        String apiBaseUrl = infoUrl.replace("{base_date}", baseDate)
                .replace("{base_time}",baseTime)
                .replace("{api_key}",infoKey);


        HttpConnection<String> connection = new HttpConnection<>();
        Map<String, Object> reqHeader = new HashMap<>();

        String infoResponse = "";
        try {
            infoResponse = connection.doGet(apiBaseUrl, reqHeader, null);
        }catch (HttpConnectionException e) {
            logger.info(e.getMessage(), e);
        }

        Gson gson = new Gson();

        if(!infoResponse.contains("ERROR")){
            WeatherApiResponse weatherApiResponse = gson.fromJson(infoResponse, new TypeToken<WeatherApiResponse>() {}.getType());
            List<WeatherBodyItem> weatherItemList = weatherApiResponse.getResponse().getBody().getItems().getItem();

            List<WeatherBodyItem> nowWeatherItemList = new ArrayList<>();

            for(WeatherBodyItem item : weatherItemList){
                if(item.getFcstTime().equals(nowHourStr+"00")){
                    nowWeatherItemList.add(item); // 현재 시간대의 정보만 가져와서 저장
                }
            }

            for(WeatherBodyItem item : nowWeatherItemList){
                if(item.getCategory().equals("T1H")){
                    infoResult.setTempCd(item.getFcstValue());
                    infoResult.setTempNm("기온");
                }else if(item.getCategory().equals("RN1")){
                    infoResult.setRainCd(item.getFcstValue());
                    infoResult.setRainNm("강수량");
                }else if(item.getCategory().equals("SKY")){
                    infoResult.setSkyNm("하늘상태");
                    infoResult.setSkyCd(item.getFcstValue());
            }else if(item.getCategory().equals("REH")){
                    infoResult.setHumiNm("습도");
                    infoResult.setHumiCd(item.getFcstValue());
                }else if(item.getCategory().equals("PTY")){
                    infoResult.setSkyRainNm("강수형태");
                    infoResult.setSkyRainCd(item.getFcstValue());
                }else if(item.getCategory().equals("VEC")){
                    infoResult.setWindNm("풍향");
                    infoResult.setWindCd(item.getFcstValue());
                }else{
                    infoResult.setWindSpeedNm("풍속");
                    infoResult.setWindSpeedCd(item.getFcstValue());
                }
            }
        }else{
            infoResult.setTempCd("0");
            infoResult.setTempNm("기온");
            infoResult.setRainCd("0");
            infoResult.setRainNm("강수량");
            infoResult.setSkyNm("하늘상태");
            infoResult.setSkyCd("1");
            infoResult.setHumiNm("습도");
            infoResult.setHumiCd("0");
            infoResult.setSkyRainNm("강수형태");
            infoResult.setSkyRainCd("0");
            infoResult.setWindNm("풍향");
            infoResult.setWindCd("134");
            infoResult.setWindSpeedNm("풍속");
            infoResult.setWindSpeedCd("0");
        }


        return infoResult;
    }

    public String getWeatherReport(String baseDate){

        String result = "특보 없음";
        //기상 특보
        String apiBaseUrl = reportUrl.replace("{toTime}", baseDate)
                .replace("{fromTime}",baseDate)
                .replace("{apiKey}",reportKey);


        HttpConnection<String> connection = new HttpConnection<>();
        Map<String, Object> reqHeader = new HashMap<>();

        String reportResponse = null;
        try {
            reportResponse = connection.doGet(apiBaseUrl, reqHeader, null);
            logger.info("reportResponse:{}", reportResponse);

        }catch (HttpConnectionException e) {
            logger.info(e.getMessage(), e);
        }

        if(reportResponse==null){
            return result;
        } else if (reportResponse.trim().startsWith("<OpenAPI_ServiceResponse>")) {
            return result;
        }else{
            Gson gson = new Gson();;
            ReportApiResponse weatherApiResponse = gson.fromJson(reportResponse,  new TypeToken<ReportApiResponse>() {}.getType());
            String resultCode = weatherApiResponse.getResponse().getHeader().getResultCode();
            List<ReportBodyItem> weatherItemList = new ArrayList<>();
            if(resultCode.equals("00")){
                weatherItemList = weatherApiResponse.getResponse().getBody().getItems().getItem();
            }

            if(!weatherItemList.isEmpty()){
                result = weatherItemList.get(0).getTitle();
            }
        }
        return result;

    }

}
