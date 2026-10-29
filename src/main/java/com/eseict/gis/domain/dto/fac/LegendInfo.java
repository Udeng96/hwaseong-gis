package com.eseict.gis.domain.dto.fac;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class LegendInfo {

    private String legendId;
    private String legendNm;
    private List<FacInfo> facInfos;

    public LegendInfo(String legendId, String legendNm){
        this.legendId = legendId;
        this.legendNm = legendNm;
        this.facInfos = new ArrayList<>();
    }

}
