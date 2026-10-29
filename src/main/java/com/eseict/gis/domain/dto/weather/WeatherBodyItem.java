package com.eseict.gis.domain.dto.weather;

import lombok.*;

import java.util.StringTokenizer;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherBodyItem {

    private String baseDate;
    private String baseTime;
    private String category;
    private String fcstDate;
    private String fcstTime;
    private String fcstValue;
    private int nx;
    private int ny;

}
