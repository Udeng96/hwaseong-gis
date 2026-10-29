package com.eseict.gis.domain.dto.address;

import lombok.Data;

import java.util.Map;

@Data
public class VWorldApi {
    String url;
    Map<String, String> subUrls;
    Map<String, String> params;
    Map<String, String> headers;
}
