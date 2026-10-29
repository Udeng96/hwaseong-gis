package com.eseict.gis.service.common;

import com.localhostmon.net.http.HttpConnection;
import com.localhostmon.net.http.HttpConnectionException;
import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.common.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OmsService {

    private static final Logger logger = LoggerFactory.getLogger(OmsService.class);

    @Value("${platform.gis.secret}")
    String GIS_SECRET;

    @Value("${platform.gis.key}")
    String GIS_KEY;

    @Value("${platform.oms.secret}")
    String OMS_SECRET;

    @Value("${platform.oms.key}")
    String OMS_KEY;

    @Value("${platform.oms.api.url.base}")
    String OMS_API_BASE_URL;

    @Value("${platform.oms.api.url.redirect.sys}")
    String OMS_API_REDIRECT_SYS_URL;

    @Value("${platform.oms.api.url.user.info}")
    String OMS_API_URL_USER_INFO_URL;

    @Value("${platform.oms.api.url.user.sysAuth}")
    String OMS_API_URL_SYS_AUTH_URL;

    @Value("${platform.oms.api.url.user.sysList}")
    String OMS_API_URL_SYS_LIST_URL;

    @Value("${platform.oms.api.url.user.logout}")
    String OMS_API_URL_LOGOUT_URL;

    Gson gson = new Gson();


    public UserInfo getUserInfo(String token){
        UserInfo result = new UserInfo();

        //개발모드일 경우
        if(ApiConstant.IS_DEV){
            result.setUserName("개발 관리자");
            result.setToken("token");
            result.setUserType("001");
            result.setUserId("developer");
            result.setLoginId("dev_id");
            result.setMobile("010-0000-0000");
            result.setEmail("eseIct@localhost");
            result.setUserGd("dev_gd");
            result.setUserZnCd("400");
        }else{
            try{
                if(!token.isEmpty()){

                    Map<String, Object> reqHeader = new HashMap<>();
                    reqHeader.put("systemKey", GIS_KEY);
                    reqHeader.put("secret",GIS_SECRET);
                    Map<String, Object> reqParam = new HashMap<>();
                    reqParam.put("token",token);

                    String getUserInfoUrl = OMS_API_BASE_URL.concat(OMS_API_URL_USER_INFO_URL);

                    HttpConnection<String> connection = new HttpConnection<>();

                    String userInfoResponse = null;
                    userInfoResponse = connection.doPost(getUserInfoUrl, reqHeader, reqParam);
                    UserInfoResponse userResponse = gson.fromJson(userInfoResponse, new TypeToken<UserInfoResponse>(){}.getType());

                    if(userResponse.getResult().equals(ApiConstant.Result.OMS_SUCCESS_CODE)){
                        result = userResponse.getData();
                    }

                }
            }catch (Exception e){
                logger.error(e.getMessage(),e);
            }

        }

        return result;
    }

    public List<SysInfo> getSysList (String token){
        List<SysInfo> result = new ArrayList<>();
        try{
            if(ApiConstant.IS_DEV){
                SysInfo omsInfo = new SysInfo();
                omsInfo.setSysName("oms");
                omsInfo.setUrl("http://localhost:11919/oms");

                SysInfo exInfo = new SysInfo();
                exInfo.setSysName("naver");
                exInfo.setUrl("https://naver.com");
                result.add(omsInfo);
                result.add(exInfo);
            }else{
                Map<String, Object> reqHeader = new HashMap<>();
                reqHeader.put("systemKey", OMS_KEY);
                reqHeader.put("secret",OMS_SECRET);
                Map<String, Object> reqParam = new HashMap<>();
                reqParam.put("token",token);

                String getSysListUrl = OMS_API_BASE_URL.concat(OMS_API_URL_SYS_LIST_URL);
                HttpConnection<String>  connection = new HttpConnection<>();

                String SysListResponseStr = null;
                SysListResponseStr = connection.doPost(getSysListUrl, reqHeader, reqParam);

                SysInfoResponse listResponse = gson.fromJson(SysListResponseStr, new com.google.common.reflect.TypeToken<SysInfoResponse>(){}.getType());
                if(listResponse.getResult().equals(ApiConstant.Result.OMS_SUCCESS_CODE)){
                    result = listResponse.getData();
                }
            }
        }catch(HttpConnectionException e){
            logger.error(e.getMessage(),e);
        }

        return result;
    }

    public void doRedirect(HttpServletResponse response){
        try{
            response.sendRedirect(OMS_API_BASE_URL);
        }catch (IOException e){
            logger.error(e.getMessage(), e);
            try{
                response.sendRedirect(OMS_API_BASE_URL);
            }catch (IOException ex){
                logger.error(ex.getMessage(), ex);
            }
        }
    }

    public String doLogOut(String token){
        String result = "FAIL";
        try{
            HttpConnection<String> connection = new HttpConnection<>();

            String logoutUrl = OMS_API_BASE_URL.concat(OMS_API_URL_LOGOUT_URL);
            Map<String, Object> reqHeader = new HashMap<>();
            Map<String, Object> reqParam = new HashMap<>();
            reqHeader.put("systemKey", GIS_KEY);
            reqHeader.put("secret",GIS_SECRET);
            reqParam.put("token", token);
            String logoutResponse = null;
            logoutResponse = connection.doPost(logoutUrl, reqHeader, reqParam);

            UserLogoutResponse listResponse = gson.fromJson(logoutResponse, new com.google.common.reflect.TypeToken<UserLogoutResponse>(){}.getType());

            if(listResponse.getResult().equals(ApiConstant.Result.OMS_SUCCESS_CODE)){
                result = listResponse.getResult();
            }

        }catch (HttpConnectionException e){

            logger.error("LOGOUT SERVICE ERROR : {}", e.getMessage());

        }

        return result;
    }



}
