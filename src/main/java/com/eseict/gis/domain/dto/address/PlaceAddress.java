package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class PlaceAddress {
    String road;
    String parcel;
}
