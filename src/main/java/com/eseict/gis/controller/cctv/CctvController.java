package com.eseict.gis.controller.cctv;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.cctv.CctvInfo;
import com.eseict.gis.service.cctv.CctvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/cctv", produces = ApiConstant.API_PRODUCES)
public class CctvController {


    @Autowired
    CctvService cctvService;

    @GetMapping(value = "/list")
    public List<CctvInfo> getCctvList(
            @RequestParam(value = "cctvNm", defaultValue = "")String cctvNm,
            @RequestParam(value = "cctvClfy",defaultValue = "")String cctvClfy

    ){
        return cctvService.getCctvList(cctvClfy,cctvNm);
    }
}
