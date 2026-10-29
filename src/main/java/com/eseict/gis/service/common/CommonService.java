package com.eseict.gis.service.common;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.dao.common.CommonDao;
import com.eseict.gis.domain.dto.common.CodeInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.Arrays;
import java.util.List;

@Service
public class CommonService {

    @Autowired
    CommonDao commonDao;

    private final static Logger logger = LoggerFactory.getLogger(CommonService.class);

    public List<CodeInfo> getEventList(){

        List<String> eventTypeList = Arrays.asList(ApiConstant.EVENT_CD.POLICE, ApiConstant.EVENT_CD.FIRE, ApiConstant.EVENT_CD.SAFETY,ApiConstant.EVENT_CD.EMS, ApiConstant.EVENT_CD.NDM, ApiConstant.EVENT_CD.ANM);

        return commonDao.getEventList(eventTypeList);

    }

    public List<CodeInfo> getZnCdList(){

        List<String> exceptAreaList = Arrays.asList("999","445");

        return commonDao.getZnCdList(exceptAreaList);
    }

    public List<CodeInfo> getCctvClfyList(){


        return commonDao.getCctvTypeList();
    }

}
