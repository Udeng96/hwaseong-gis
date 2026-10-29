package com.eseict.gis.utils;

import com.localhostmon.base.SystemProperties;
import com.localhostmon.net.http.HttpConnection;
import com.eseict.gis.config.VWorldApSystemProperties;
import com.eseict.gis.config.VWorldApiProperties;
import com.eseict.gis.domain.dto.address.*;
import com.google.common.collect.Maps;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component("VWorldParser")
@RequiredArgsConstructor
@Slf4j
public class VWorldParser {
    @Autowired
    VWorldApiProperties apiProperties;
    @Autowired
    VWorldApSystemProperties systemProperties;

    private static Logger logger = LoggerFactory.getLogger(VWorldParser.class);
    private final Boolean isDev = Boolean.parseBoolean(SystemProperties.getProperty("IS_DEV"));
    @Value("${public.common.apis.vworld.subUrls.searchPos}")
    private String searchPos;
    @Value("${public.common.apis.vworld.params.key}")
    private String key;


    public List<AddrSearchResult> searchByAddress(String address, String type) throws IllegalAccessException {
        ProxyUtil proxyUtil = new ProxyUtil(systemProperties.getValue("proxy"));
        VWorldApi vWorldApi = apiProperties.getApi("vworld");

        if (address == null || address.trim().isEmpty()) {
            throw new IllegalAccessException("Address cannot be null or empty");
        }



        if (!isDev) {
            vWorldApi.setUrl(proxyUtil.getUrlWithProxy(vWorldApi.getUrl()));
        }

        vWorldApi.getSubUrls().put("searchPos", searchPos);
        String response = "";
        try {
            HttpConnection httpConnection = new HttpConnection();
            String encodeQuery = URLEncoder.encode(address,"UTF-8");
            String reqUrl = "";
            if(type.equals("place")){
                reqUrl=vWorldApi.getUrl().concat(vWorldApi.getSubUrls().get("searchPos")).replace("{type}",type).replace("{key}",key).replace("&category={category}","").concat("&query=").concat(encodeQuery);
            }else if(type.equals("address")){
                reqUrl=vWorldApi.getUrl().concat(vWorldApi.getSubUrls().get("searchPos")).replace("{type}",type).replace("{key}",key).replace("{category}","parcel").concat("&query=").concat(encodeQuery);
            }else if(type.equals("road")){
                reqUrl=vWorldApi.getUrl().concat(vWorldApi.getSubUrls().get("searchPos")).replace("{type}","address").replace("{key}",key).replace("{category}","road").concat("&query=").concat(encodeQuery);
            }else{
                reqUrl=vWorldApi.getUrl().concat(vWorldApi.getSubUrls().get("searchPos")).replace("{type}",type).replace("{key}",key).replace("{category}","L4").concat("&query=").concat(encodeQuery);
            }
            Map<String, String> requestHeaderMap = Maps.newHashMap();
            Map<String, String> requestParamMap = Maps.newHashMap();

            // httpConnection.doGet으로 지정된 URL로 HTTP GET요청을 수행한다.
            // 즉 위의 reqUrl과 requestParamMap으로 URL을 생성하여 HTTP GET요청함으로써
            // vWorld에서 해당 address의 검색 결과값을 return받는다.
            response = (String) httpConnection.doGet(reqUrl, requestHeaderMap, requestParamMap);
            log.info("response:{}", response);

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        //JsonParserUtil.getJsonArray를 사용해서 JSON 형태의 문자열(1st param)을 파싱한다. 그 결과로 VWorldPositionVO.class(3rd param)의 List를 얻는다.
        List<AddrSearchResult> resultList = new ArrayList<>();


        if(type.equals("place")){
            List<VworldPlaceResponse> placeResponses=JsonParserUtil.getJsonArray(response, new String[]{"response", "result", "items"}, VworldPlaceResponse.class);
            if(!placeResponses.isEmpty()){
                for(VworldPlaceResponse vworldPlaceResponse : placeResponses){
                    AddrSearchResult vworldResult = new AddrSearchResult();
                    vworldResult.setTitle(vworldPlaceResponse.getTitle());
                    vworldResult.setParcel(vworldPlaceResponse.getAddress().getParcel());
                    vworldResult.setRoad(vworldPlaceResponse.getAddress().getRoad());
                    vworldResult.setX(vworldPlaceResponse.getPoint().getX());
                    vworldResult.setY(vworldPlaceResponse.getPoint().getY());
                    resultList.add(vworldResult);
                }
            }
        }else if(type.equals("address")){
            List<VworldParcelResponse> parcelResponse=JsonParserUtil.getJsonArray(response, new String[]{"response", "result", "items"}, VworldParcelResponse.class);
            if(!parcelResponse.isEmpty()){
                for(VworldParcelResponse vworldParcelResponse : parcelResponse){
                    AddrSearchResult vworldResult = new AddrSearchResult();
                    vworldResult.setTitle(vworldParcelResponse.getAddress().getParcel());
                    vworldResult.setParcel(vworldParcelResponse.getAddress().getParcel());
                    vworldResult.setRoad(vworldParcelResponse.getAddress().getRoad());
                    vworldResult.setX(vworldParcelResponse.getPoint().getX());
                    vworldResult.setY(vworldParcelResponse.getPoint().getY());
                    resultList.add(vworldResult);
                }
            }
        }else if(type.equals("road")){
            List<VworldRoadResponse> roadResponse=JsonParserUtil.getJsonArray(response, new String[]{"response", "result", "items"}, VworldRoadResponse.class);
            if(!roadResponse.isEmpty()){
                for(VworldRoadResponse vworldRoadResponse : roadResponse){
                    AddrSearchResult vworldResult = new AddrSearchResult();
                    if(vworldRoadResponse.getAddress().getBldnmdc().isEmpty()){
                        vworldResult.setTitle(vworldRoadResponse.getAddress().getRoad());
                    }else{
                        vworldResult.setTitle(vworldRoadResponse.getAddress().getRoad().replace(")",", "+vworldRoadResponse.getAddress().getBldnmdc().concat(")")));
                    }
                    vworldResult.setParcel(vworldRoadResponse.getAddress().getParcel());
                    vworldResult.setRoad(vworldRoadResponse.getAddress().getRoad());
                    vworldResult.setX(vworldRoadResponse.getPoint().getX());
                    vworldResult.setY(vworldRoadResponse.getPoint().getY());
                    resultList.add(vworldResult);
                }
            }

        }else{
            List<VworldDistrictResponse> districtResponse=JsonParserUtil.getJsonArray(response, new String[]{"response", "result", "items"}, VworldDistrictResponse.class);
            if(!districtResponse.isEmpty()){
                for(VworldDistrictResponse vworldDistrictResponse : districtResponse){
                    AddrSearchResult vworldResult = new AddrSearchResult();
                    vworldResult.setTitle(vworldDistrictResponse.getTitle());
                    vworldResult.setParcel("");
                    vworldResult.setRoad("");
                    vworldResult.setX(vworldDistrictResponse.getPoint().getX());
                    vworldResult.setY(vworldDistrictResponse.getPoint().getY());
                    resultList.add(vworldResult);
                }
            }

        }
        return resultList;
    }

}
