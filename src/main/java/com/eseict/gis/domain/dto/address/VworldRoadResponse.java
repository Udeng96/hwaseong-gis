package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class VworldRoadResponse {
    String id;
    RoadAddress address;
    VworldPoint point;
}
