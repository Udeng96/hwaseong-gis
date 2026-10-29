package com.eseict.gis.domain.dto.fac;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class FacInfo {

    private String facId;
    private String facNm;
    private String facAddr;
    private String facClfyId;
    private String facClfyNm;
    private String facLat;
    private String facLon;
    private String creDtm;
    private String mgtNo;

}
