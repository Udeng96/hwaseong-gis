package com.eseict.gis.domain.dto.address;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class AddrSearchResult {

    private String title;
    private String road;
    private String parcel;
    private String x;
    private String y;

}
