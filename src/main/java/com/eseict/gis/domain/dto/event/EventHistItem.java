package com.eseict.gis.domain.dto.event;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class EventHistItem {

    private String seqn;
    private String eventCd;
    private String eventNm;
    private String znCd;
    private String znNm;
    private String addr;
    private String outbDtm;
    private String cntn;
    private String lat;
    private String lon;

}
