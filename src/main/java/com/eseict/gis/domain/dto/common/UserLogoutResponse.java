package com.eseict.gis.domain.dto.common;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class UserLogoutResponse {

    public String result;
    public String message;
    public UserLogout data;
}
