package com.eseict.gis.domain.dto.common;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class SysInfoResponse {
    public String result;
    // 호출 결과 메시지
    public String message;
    // 시스템 정보 Array
    public List<SysInfo> data;
}
