package com.eseict.gis.domain.dto.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VWorldPositionVO {
    String id;
    String title;
    String category;
    Address address;
    Point point;

    @Data
    class Address {
        String road;
        String parcel;
    }

    @Data
    class Point {
        String x;
        String y;
    }
}
