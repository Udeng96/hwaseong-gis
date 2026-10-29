package com.eseict.gis.domain.dto.common;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class CodeInfo {
    private String codeCd; // 공통코드의 코드 (이벤트 및 지역)
    private String codeNm; // 공통코드의 이름 (이벤트 및 지역)
}
