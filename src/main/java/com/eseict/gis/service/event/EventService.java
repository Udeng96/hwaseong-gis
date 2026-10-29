package com.eseict.gis.service.event;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.dao.event.EventDao;
import com.eseict.gis.domain.dto.common.CodeInfo;
import com.eseict.gis.domain.dto.event.EventHeatmap;
import com.eseict.gis.domain.dto.event.EventHistItem;
import com.eseict.gis.service.common.CommonService;
import org.aspectj.apache.bcel.classfile.Code;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.eseict.gis.config.ApiConstant.EVENT_SVC_LIST;

@Service
public class EventService {

    @Autowired
    EventDao eventDao;

    @Autowired
    CommonService commonService;


    private final static Logger logger = LoggerFactory.getLogger(EventService.class);

    public List<EventHistItem> getEventHistList(String eventType, String area, String content, String startDtm, String endDtm, Integer limit) {

        List<String> eventTypeList = new ArrayList<>();
        if (!eventType.isEmpty()) {
            eventTypeList = Arrays.asList(eventType.split(","));
        } else {
            List<CodeInfo> eventTypes = commonService.getEventList();
            for (CodeInfo info : eventTypes) {
                eventTypeList.add(info.getCodeCd());
            }
        }

        if (!endDtm.isEmpty()) {
            endDtm = endDtm.concat("235959999");
        }

        if (!startDtm.isEmpty()) {
            startDtm = startDtm.concat("000000000");
        }

        return eventDao.getEventList(eventTypeList, area, content, startDtm, endDtm, limit);
    }

    public List<EventHeatmap> getHEatmapCountList(String startDtm, String endDtm, String statEvetCd) {

        return eventDao.getHeatmapCount(startDtm, endDtm, statEvetCd);
    }

    public List<EventHistItem> getExcelEventList(String eventType, String startDtm, String endDtm) {
        List<EventHistItem> eventHistItemList = eventDao.getExcelEventList(eventType.equals("POL001M") ? ApiConstant.EVENT_CD.POLICE : eventType, startDtm.concat("000000000"), endDtm.concat("235959999"));
        List<CodeInfo> znCdList = commonService.getZnCdList();

        if (eventType.equals("POL001M")) {
            eventHistItemList = eventHistItemList.stream().filter(item -> item.getCntn().contains("순찰차영상")).collect(Collectors.toList());
            eventHistItemList.forEach(item -> {
                item.setEventNm("순찰차출동영상");
                item.setEventCd("POL001M");
            });
        } else if (eventType.equals(ApiConstant.EVENT_CD.SAFETY)) {
            for (EventHistItem eventItem : eventHistItemList) {
                String znNm = eventItem.getAddr().split(" ")[2];
                eventItem.setZnNm(znNm);
                List<CodeInfo> znInfo = znCdList.stream().filter(item -> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
                if (!znInfo.isEmpty()) {
                    eventItem.setZnCd(znInfo.get(0).getCodeCd());
                }
            }
        } else if (eventType.equals(ApiConstant.EVENT_CD.POLICE)) {
            eventHistItemList = eventHistItemList.stream().filter(item -> !item.getCntn().contains("순찰차영상")).collect(Collectors.toList());
        }

        return eventHistItemList;
    }


}
