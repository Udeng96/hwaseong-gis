package com.eseict.gis.domain.dto.weather;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherApiResponse {
    WeatherResponse response;
}
