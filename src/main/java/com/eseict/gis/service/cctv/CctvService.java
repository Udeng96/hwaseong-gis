package com.eseict.gis.service.cctv;

import com.eseict.gis.dao.cctv.CctvDao;
import com.eseict.gis.domain.dto.cctv.CctvInfo;
import com.eseict.gis.service.common.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CctvService {

    @Autowired
    CctvDao cctvDao;

    @Autowired
    CommonService commonService;

    private static final Logger logger = LoggerFactory.getLogger(CctvService.class);

    public List<CctvInfo> getCctvList(String cctvClfy, String cctvNm){

        return cctvDao.getCctvList(cctvClfy, cctvNm);

    }

}
