package com.eseict.gis.service.fac;


import com.eseict.gis.dao.fac.FacDao;
import com.eseict.gis.domain.dto.fac.FacInfo;
import com.eseict.gis.domain.dto.fac.LegendInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacService {

    @Autowired
    FacDao facDao;

    private static final Logger logger = LoggerFactory.getLogger(FacService.class);

    public List<FacInfo> getFacInfos (String facClfyId) {
        return facDao.getFacInfos(facClfyId);
    }


    public List<LegendInfo> getLegendInfos(){

        List<LegendInfo> legendInfos = facDao.getLegendInfos();
        List<LegendInfo> result = new ArrayList<>();

        for(LegendInfo  item : legendInfos){

            List<FacInfo> itemFacInfos = new ArrayList<>();
            itemFacInfos = getFacInfos(item.getLegendId());

            item.setFacInfos(itemFacInfos);
            result.add(item);
        }

        return result;
    }

}
