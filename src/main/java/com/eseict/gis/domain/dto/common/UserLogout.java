package com.eseict.gis.domain.dto.common;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class UserLogout {
    private String redirectUrl;
}
