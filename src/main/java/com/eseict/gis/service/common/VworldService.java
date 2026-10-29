package com.eseict.gis.service.common;

import com.eseict.gis.domain.dto.address.AddrSearchResult;
import com.eseict.gis.utils.VWorldParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VworldService {


    @Autowired
    VWorldParser vWorldParser;



    private static final Logger logger = LoggerFactory.getLogger(VworldService.class);

    public List<AddrSearchResult> searchByAddress(String address, String type){

        List<AddrSearchResult> vworldData = new ArrayList<>();
        try {
            vworldData = vWorldParser.searchByAddress(address,type);
        } catch (IllegalAccessException e) {
            logger.error(e.getMessage(),e);
        }

        return vworldData;
    }


}
