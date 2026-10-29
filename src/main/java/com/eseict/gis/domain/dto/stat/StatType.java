package com.eseict.gis.domain.dto.stat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatType {

    private String type;
    private Integer count;

    public StatType(String type, Long count){
        this.type = type;
        this.count = Math.toIntExact(count);
    }


}
