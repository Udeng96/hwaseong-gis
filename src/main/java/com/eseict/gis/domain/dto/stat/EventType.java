package com.eseict.gis.domain.dto.stat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventType {

    String seqn;
    String eventType;
    String eventNm;
    String areaCd;
    String addr;
    String outbDtm;
    String cntn;

}
