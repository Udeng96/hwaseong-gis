package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class VworldParcelResponse {
    String id;
    ParcelAddress address;
    VworldPoint point;
}
