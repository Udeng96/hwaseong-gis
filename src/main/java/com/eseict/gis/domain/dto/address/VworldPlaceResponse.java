package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class VworldPlaceResponse {
    String id;
    String title;
    String category;
    PlaceAddress address;
    VworldPoint point;


}
