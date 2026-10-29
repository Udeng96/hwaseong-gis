package com.eseict.gis.domain.dto.weather;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherResponse {

    private WeatherHeader header;
    private WeatherBody body;
    private String pageNo;
    private int numOfRows;
    private int nx;
    private int ny;

}
