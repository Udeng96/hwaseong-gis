package com.eseict.gis.socket.rinoEvent.util;

import com.eseict.gis.socket.rinoEvent.message.GeneralMessage;
import com.eseict.gis.utils.IdGenerator;
import com.google.common.base.Strings;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.util.Map;

/**
 * @desc      핸들러 유틸리티
 * @pkg_name  com.eseict.tpm.common
 * @file_name HandlerUtil.java
 * @since     2018. 05. 09.
 * @author    ESE
 * Copyright(c)2017 by ESE co.ltd. All rights reserved (http://www.localhost)
 */
public class HandlerUtil {

    private static Logger _logger = LoggerFactory.getLogger(HandlerUtil.class);

    public static final String ONE_WAY 			= "1";
    public static final String ONE_WAY_ACK 		= "2";
    public static final String ACK 				= "3";

    static final String HEADER_TYP_CD_STAT_EVET = "A1";

    public static JSONObject getStatEvetItemObject(String key, Object value) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("key", key);
        jsonObject.put("value", value);
        return jsonObject;
    }

    public static GeneralMessage makeStatEventMessage(
            String clientCd, String siteCd,
    		String uSvcOutbId, String statEvetId, String statEvetNm, String procSt, String outbPosNm,
    		float x, float y, String statEvetCntn, String statEvetOutbDtm, String statEvetGd, String statEvetClrDtm,
    		Map<String, Object> statEvetItemMap) {
        String STAT_EVET_ROOT_NAME = "StatEvet";
        String MSG_TYPE_CD = "001";
        String SYS_CD = "EAS";
        GeneralMessage gm = new GeneralMessage();

        JSONObject json = new JSONObject();
        JSONObject rootJson = new JSONObject();
        JSONArray outbPosArray = new JSONArray();
        JSONArray statEvetItemArray = new JSONArray();

        if(Strings.isNullOrEmpty(uSvcOutbId)) {
//            try {
//                uSvcOutbId = IdGenerator.getUniqueIdByTime(SYS_CD, IdGenerator.TIME_17, IdGenerator.PAD_END_4);
//                uSvcOutbId = IdGenerator.getPrefixedUUID64(SYS_CD);
                uSvcOutbId = IdGenerator.getUUID64();
//            } catch (IdGeneratorException e) {
//                _logger.error(e.getMessage(), e);
//            }
        }

        json.put("uSvcOutbId", uSvcOutbId);
        json.put("statEvetId", statEvetId);
        json.put("statEvetNm", statEvetNm);

        if(!Strings.isNullOrEmpty(statEvetGd)){
        	json.put("statEvetGdCd", statEvetGd);
        }else{
        	json.put("statEvetGdCd", "01");
        }

        json.put("procSt", procSt);
        json.put("outbPosCnt", 1);
        json.put("outbPosNm", outbPosNm);

        JSONObject tempOutbPos = new JSONObject();
        tempOutbPos.put("x", String.valueOf(x));
        tempOutbPos.put("y", String.valueOf(y));
        tempOutbPos.put("z", "0");
        outbPosArray.put(tempOutbPos);
        json.put("outbPos", outbPosArray);

        json.put("statEvetCntn", Strings.isNullOrEmpty(statEvetCntn)? "내용없음" : statEvetCntn);
        json.put("statEvetOutbDtm", statEvetOutbDtm);

        for(String key : statEvetItemMap.keySet()) {
            statEvetItemArray.put(getStatEvetItemObject(key, statEvetItemMap.get(key)));
        }
        json.put("statEvetItemCnt", statEvetItemArray.length());
        json.put("statEvetItem", statEvetItemArray);

        json.put("statEvetClrDtm", Strings.isNullOrEmpty(statEvetClrDtm) ? "" : statEvetClrDtm);
        json.put("outbScopRads", "");
        json.put("outbMainGb", "P");
        json.put("statEvetActnMn", "");
        json.put("statEvetActnDtm", "");
        json.put("statEvetActnCntn", "");
        json.put("statEvetActnRslt", "");
        json.put("cpxRelEvetOutbSeqnCnt", 0);

        rootJson.put(STAT_EVET_ROOT_NAME, json);


        byte[] body = new byte[0];
        byte[] headerTyp = new byte[0];
        try {
            body = rootJson.toString().getBytes("UTF-8");
            // 헤더 타입
            headerTyp = HEADER_TYP_CD_STAT_EVET.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            _logger.error(e.getMessage(), e);
        }
        // HEDAER 부분
        _logger.info("* HandlerUtil * body length : [{}]", body.length);
        byte[] header = HeaderUtil.makeHeader(
                HEADER_TYP_CD_STAT_EVET,
                clientCd,
                siteCd,
                SYS_CD,
                MSG_TYPE_CD,
                ONE_WAY,
                IdGenerator.getPrefixedUUID64(""),
                body.length
        );


        gm.setHeaderTyp(headerTyp);
        gm.setHeader(header);
        gm.setBody(body);

        return gm;
    }


}
