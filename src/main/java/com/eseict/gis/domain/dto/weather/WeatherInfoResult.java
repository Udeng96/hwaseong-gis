package com.eseict.gis.domain.dto.weather;

import lombok.*;

import javax.persistence.TemporalType;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherInfoResult {

    private String TempCd;// 기온
    private String TempNm;
    private String rainCd;// 강수량
    private String rainNm;
    private String skyCd; // 하늘상태 1(맑음) / 3(구름많음) / 4(흐림)
    private String skyNm;
    private String humiCd; //습도
    private String humiNm;
    private String skyRainCd; // 강수형태 0(없음) / 1(비) / 2(비/눈) / 3(눈) / 5(빗방울) / 6(빗방울눈날림) / 7(눈날림)
    private String skyRainNm;
    private String windCd; //풍향
    private String windNm;
    private String windSpeedCd; //풍속
    private String windSpeedNm;



}
