package com.eseict.gis.domain.dto.weather;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherHeader {

    private String resultCode; // 성공 : 00 /  실패 : 01 / 데이터 없음 : 03
    private String resultMsg;
}
