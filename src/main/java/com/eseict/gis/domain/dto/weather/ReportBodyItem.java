package com.eseict.gis.domain.dto.weather;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class ReportBodyItem {

    private String stnId;
    private String title;
    private String tmFc;
    private int tmSeq;
}
