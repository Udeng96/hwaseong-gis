package com.eseict.gis.controller.common;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.common.CodeInfo;
import com.eseict.gis.domain.dto.common.SysInfo;
import com.eseict.gis.domain.dto.common.UserInfo;
import com.eseict.gis.service.common.CommonService;
import com.eseict.gis.service.common.OmsService;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/common", produces = ApiConstant.API_PRODUCES)
public class CommonController {

    @Autowired
    CommonService commonService;

    @Autowired
    OmsService omsService;

    private static final Logger logger = LoggerFactory.getLogger(ViewController.class);

    @GetMapping("/type/event")
    public List<CodeInfo> getEventType(){

        return commonService.getEventList();

    }

    @GetMapping("/type/area")
    public List<CodeInfo> getEventArea(){

        return commonService.getZnCdList();

    }

    @GetMapping("/type/cctv")
    public List<CodeInfo> getCctvType(){
        return commonService.getCctvClfyList();
    }

    @GetMapping("/user/info")
    public UserInfo getUserInfo(
            @RequestParam(value = "token", defaultValue = "")String token
    ){
        return omsService.getUserInfo(token);
    }

    @GetMapping("/user/sysInfo")
    public List<SysInfo> getSysInfo(
            @RequestParam(value = "token",defaultValue = "")String token
    ){
        return omsService.getSysList(token);
    }

    @PostMapping("/user/logout")
    public String doLogout(
            @RequestParam(value = "token", required = false) String token,
            HttpServletRequest request,
            HttpServletResponse response,
            HttpSession session
    ) {

        String result = "FAIL";

        // request 에서 parameter 로 받은 값이 없을 경우
        if (Strings.isNullOrEmpty(token)) {
            token = (String) request.getSession().getAttribute("token");
        }

        // 개발 모드일 경우
        if (ApiConstant.IS_DEV) {
            result = "DEV LOGOUT OK";
        } else {

            // session 에 저장된 token 값이 있을 경우 (없으면 FAIL)
            if(!Strings.isNullOrEmpty(token)){
                result = omsService.doLogOut(token);
            }
        }

        return result;
    }
}
