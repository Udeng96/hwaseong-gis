package com.eseict.gis.controller.common;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.service.common.OmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin("*")
@RequestMapping(value="/view", produces = ApiConstant.API_PRODUCES)
public class ViewController {

    private static final Logger logger = LoggerFactory.getLogger(ViewController.class);

    @Autowired
    OmsService omsService;

    @RequestMapping(value = "")
    public String gisView(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession();
        String token = request.getParameter("token");
        session.setMaxInactiveInterval(0);

        if(ApiConstant.IS_DEV){
            session.setAttribute("token","token");
            Cookie cookie = new Cookie("token","token"); //cookie에 토큰 넣기
        }else{
            if(!token.isEmpty()){
                session.setAttribute("token",token);
                Cookie cookie = new Cookie("token",token);
                response.addCookie(cookie);
            }else{

                omsService.doRedirect(response);

            }
        }

        return "index";
    }


}
