package com.eseict.gis.controller.fac;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.fac.LegendInfo;
import com.eseict.gis.service.fac.FacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/fac", produces = ApiConstant.API_PRODUCES)
public class facController {

    @Autowired
    FacService facService;

    @GetMapping("/legend/list")
    public List<LegendInfo> getLegendInfos(){
        return facService.getLegendInfos();
    }
}
