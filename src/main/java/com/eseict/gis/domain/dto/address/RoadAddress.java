package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class RoadAddress {
    String zipcode;
    String category;
    String road;
    String parcel;
    String bldnm;
    String bldnmdc;
}
