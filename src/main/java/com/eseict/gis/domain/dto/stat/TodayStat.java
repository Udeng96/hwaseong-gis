package com.eseict.gis.domain.dto.stat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodayStat {

    private String eventCd;
    private Integer totalCnt;
    private List<StatType> timeStat;
    private List<EventType> eventList;

}
