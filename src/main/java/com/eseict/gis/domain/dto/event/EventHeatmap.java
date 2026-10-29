package com.eseict.gis.domain.dto.event;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class EventHeatmap {

    private Double lat;
    private Double lng;
    private int count;

    public EventHeatmap(String lat, String lng, Long count){
        this.lat = Double.parseDouble(lat);
        this.lng = Double.parseDouble(lng);
        this.count = Math.toIntExact(count);
    }
}
