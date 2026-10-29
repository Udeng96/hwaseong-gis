package com.eseict.gis.domain.dto.stat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthStat {
    private Integer allCnt;
    private String eventCd;
    private String mostType;
    private Integer mostTypeCnt;
    private String mostArea;
    private Integer mostAreaCnt;
    private List<StatType> typeStatList;
    private List<StatType> dateStatList;
    private List<StatType> areaStatList;
}
