package com.eseict.gis.domain.dto.cctv;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class CctvInfo {

    private String cctvId;
    private String cctvNm;
    private String cctvClfy;
    private String cctvLat;
    private String cctvLon;
    private String mgtNo;

}
