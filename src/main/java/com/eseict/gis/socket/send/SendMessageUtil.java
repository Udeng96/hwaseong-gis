package com.eseict.gis.socket.send;

import com.eseict.gis.socket.rinoEvent.message.GeneralMessage;
import com.eseict.gis.socket.rinoEvent.util.HandlerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.SocketException;
import java.util.HashMap;
import java.util.Map;

public class SendMessageUtil {

    private static final Logger logger = LoggerFactory.getLogger(SendMessageUtil.class);


    public void send(String clientCd, String siteCd) throws SocketException {
        // clientCd-siteCd-znCdSvcThemeCdUnitSvcCdevetGdCdstatEvetCd
        // ex) 000-000-ZZZSSSUUUE01
        String statEvetId = clientCd + "-" + siteCd + "-" + "znCd" + "svcThemeCd" + "unitSvcCd" + "evetGbCd" + "statEvetCd";
        String statEvetNm = "이벤트명칭";
        String uSvcOutbId = "이벤트 구분을 위한 아이디"; // 최대 24자리
        String outbPlacAddress = "발생장소 주소";
        String statEvetCntn = "이벤트 내용";
        String outbDtm = "20230404132345000"; // 발생시간(17자리)
        String statEvetGdCd = "10"; // ERS에 설정된 이벤트 등급에 해당하는 값을 넣어야합니다.
        String statEvetClrDtm = null; // 이벤트 종료 또는 해제시 시간을 넣어야합니다. 최초 발생시에는 null을 넣어야합니다.
        String procSt = "1"; // 1:발생, 2:지령, 3:조치, 4:해제, 5:종료


        Map<String, Object> statEvetItemMap = new HashMap<>();
        // ERS에 설정된 이벤트 항목에 해당하는 값을 넣어줘야합니다.
        statEvetItemMap.put("key", "value");



        float xCrdnt = 0.0f;
        float yCrdnt = 0.0f;

        GeneralMessage gm = HandlerUtil.makeStatEventMessage(clientCd, siteCd,
                uSvcOutbId, statEvetId, statEvetNm, procSt,
                outbPlacAddress,
                xCrdnt, // lat
                yCrdnt, // lon
                statEvetCntn,
                outbDtm,
                statEvetGdCd,
                statEvetClrDtm,
                statEvetItemMap);

        String ip = "40.10.10.51";
        int port = 11210;
        SocketTempSendProcImpl client = new SocketTempSendProcImpl(ip, port);
        String result = client.send(gm) ? "SUCCESS" : "FAIL";
        logger.info(" ** `EvetFireFight Interface result : [{}]", result);
    }
}
