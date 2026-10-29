package com.eseict.gis.domain.dto.weather;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class WeatherItemList {
    private List<WeatherBodyItem> item;
}
