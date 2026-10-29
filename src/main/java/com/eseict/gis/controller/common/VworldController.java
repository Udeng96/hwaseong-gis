package com.eseict.gis.controller.common;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.address.AddrSearchResult;
import com.eseict.gis.service.common.VworldService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/vworld", produces = ApiConstant.API_PRODUCES)
public class VworldController {

    private static final Logger logger = LoggerFactory.getLogger(VworldController.class);

    @Autowired
    VworldService vworldService;

    @GetMapping("/search")
    public List<AddrSearchResult> getAddress(
            @RequestParam(value = "address")String address,
            @RequestParam(value = "type")String type
    ){

        List<AddrSearchResult> response = new ArrayList<>();
        try{
            response = vworldService.searchByAddress(address, type);
        }catch (Exception e){
            logger.error(e.getMessage(), e);
        }

        return response;

    }



}
