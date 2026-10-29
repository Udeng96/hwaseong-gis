package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class VworldDistrictResponse {
    String id;
    String title;
    String geometry;
    VworldPoint point;
}
