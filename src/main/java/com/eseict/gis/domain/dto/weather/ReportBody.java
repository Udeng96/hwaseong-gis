package com.eseict.gis.domain.dto.weather;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class ReportBody {
    private String dataType;
    private ReportItemList items;
    private int pageNo;
    private int numOfRows;
    private int totalCount;
}
