package com.eseict.gis.domain.dto.common;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class UserInfo {


    private String token;
    private String userId;
    private String userName;
    private String loginId;
    private String mobile;
    private String email;
    private String userGd;
    private String userType;
    private String userZnCd; // 지자체 사용자 시 사용자 지역

}
