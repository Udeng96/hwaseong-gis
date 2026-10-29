package com.eseict.gis.service.stat;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.dao.event.EventDao;
import com.eseict.gis.dao.fac.FacDao;
import com.eseict.gis.domain.dto.common.CodeInfo;
import com.eseict.gis.domain.dto.stat.EventType;
import com.eseict.gis.domain.dto.stat.MonthStat;
import com.eseict.gis.domain.dto.stat.StatType;
import com.eseict.gis.domain.dto.stat.TodayStat;
import com.eseict.gis.domain.vo.fms.FacInfo;
import com.eseict.gis.service.common.CommonService;
import com.eseict.gis.socket.rinoEvent.rcv.RinoEventSocketServer;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.eseict.gis.config.ApiConstant.FAC_CLFY_LIST;

@Service
public class StatService {

    @Autowired
    EventDao eventDao;

    @Autowired
    FacDao facDao;

    private static Logger logger = LoggerFactory.getLogger(StatService.class);

    public List<StatType> getFacCntList(){

        List<String> facClfyList = FAC_CLFY_LIST;
        List<StatType> statList = facDao.getFacCnt(facClfyList);
        statList.sort(Comparator.comparing(StatType::getType));
        return statList;
    }

    public List<TodayStat> getTodayStatList() {
        List<CodeInfo> znCdList = eventDao.getAreaList();

        List<EventType> fireEvents = eventDao.getTodayList("FFT", getToday() + "000000", getToday() + "235959");
        List<EventType> policeEvents = eventDao.getTodayList("POL", getToday() + "000000", getToday() + "235959");
        List<EventType> policeNoDispatchEvents = policeEvents.stream().filter((item)-> !item.getCntn().contains("순찰차영상")).collect(Collectors.toList());
        List<EventType> dispatchEvents = policeEvents.stream().filter((event) -> event.getCntn().contains("순찰차영상")).collect(Collectors.toList());
        List<EventType> safetyEvents = eventDao.getTodayList("SWE", getToday() + "000000", getToday() + "235959");
        List<EventType> ndmEvents = eventDao.getTodayList("NDM", getToday() + "000000", getToday() + "235959");
        List<EventType> anmEvents = eventDao.getTodayList("ANE", getToday() + "000000", getToday() + "235959");

        TodayStat fireStat = getTodayStat(fireEvents, ApiConstant.EVENT_CD.FIRE);
        TodayStat policeStat = getTodayStat(policeNoDispatchEvents, ApiConstant.EVENT_CD.POLICE);
        TodayStat dispatchStat = getTodayStat(dispatchEvents, ApiConstant.EVENT_CD.DISPATCH);
        TodayStat safetyStat = getTodayStat(safetyEvents, ApiConstant.EVENT_CD.SAFETY);
        TodayStat ndmStat = getTodayStat(ndmEvents, ApiConstant.EVENT_CD.NDM);
        TodayStat anmStat = getTodayStat(anmEvents, ApiConstant.EVENT_CD.ANM);

        // 도로명 주소가 들어가있는 경웅가 있는데 이 경우 지역별 통계를 판별하기가 어려워 제외시킴.
        // 해당 사항 협의 필요
        safetyEvents = safetyEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());
        ndmEvents = ndmEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());



        for(EventType events : safetyEvents){
            String znNm = events.getAddr().split(" ")[2];
            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
            if(!znInfo.isEmpty()){
                events.setAreaCd(znInfo.get(0).getCodeCd());
            }
        }

        for(EventType events : ndmEvents){
            String znNm = events.getAddr().split(" ")[2];
            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
            if(!znInfo.isEmpty()){
                events.setAreaCd(znInfo.get(0).getCodeCd());
            }
        }


        //todo - 법무부 데이터는 주소값이 아예 없어서 일단 필터링은 제거하고 지역 관련 차트 없이 표출하는 것으로 변경
        //anmEvents = anmEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());
//        for(EventType events : anmEvents){
//            String znNm = events.getAddr().split(" ")[2];
//            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
//            if(!znInfo.isEmpty()){
//                events.setAreaCd(znInfo.get(0).getCodeCd());
//            }
//        }



        List<TodayStat> result = new ArrayList<>();
        result.add(fireStat);
        result.add(policeStat);
        result.add(dispatchStat);
        result.add(safetyStat);
        result.add(ndmStat);
        result.add(anmStat);

        return result;
    }

    public TodayStat getTodayStat(List<EventType> eventList, String eventType) {
        Map<String, List<EventType>> timeEventMap = groupByHour(eventList);
        List<StatType> timeList = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            String time = i > 9 ? String.valueOf(i) : "0" + i;
            if (timeEventMap.containsKey(time)) {
                timeList.add(new StatType(time, timeEventMap.get(time).size()));
            } else {
                timeList.add(new StatType(time, 0));
            }
        }
        return new TodayStat(eventType, eventList.size(), timeList, eventList);
    }

    public List<MonthStat> getMonthStatList (String startDtm, String endDtm){
        List<CodeInfo> znCdList = eventDao.getAreaList();

        List<EventType> fireEvents = eventDao.getTodayList(ApiConstant.EVENT_CD.FIRE, startDtm + "000000", endDtm + "235959");
        List<EventType> policeEvents = eventDao.getTodayList(ApiConstant.EVENT_CD.POLICE, startDtm + "000000", endDtm + "235959");
        List<EventType> ndmEvents = eventDao.getTodayList(ApiConstant.EVENT_CD.NDM, startDtm + "000000", endDtm + "235959");
        List<EventType> anmEvents = eventDao.getTodayList(ApiConstant.EVENT_CD.ANM, startDtm + "000000", endDtm + "235959");
        List<EventType> policeNoDispatchEvents = policeEvents.stream().filter((item)-> !item.getCntn().contains("순찰차영상")).collect(Collectors.toList());
        List<EventType> dispatchEvents = policeEvents.stream().filter((event) -> event.getCntn().contains("순찰차영상")).peek((item)-> item.setEventNm("순찰차출동영상")).collect(Collectors.toList());
        List<EventType> safetyEvents = eventDao.getTodayList(ApiConstant.EVENT_CD.SAFETY, startDtm + "000000", endDtm + "235959");

        // 도로명 주소가 들어가있는 경웅가 있는데 이 경우 지역별 통계를 판별하기가 어려워 제외시킴.
        // 해당 사항 협의 필요


        safetyEvents = safetyEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());
        ndmEvents = ndmEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());


        for(EventType events : safetyEvents){
            String znNm = events.getAddr().split(" ")[2];
            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
            if(!znInfo.isEmpty()){
                events.setAreaCd(znInfo.get(0).getCodeCd());
            }
        }

        for(EventType events : ndmEvents){
            String znNm = events.getAddr().split(" ")[2];
            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
            if(!znInfo.isEmpty()){
                events.setAreaCd(znInfo.get(0).getCodeCd());
            }
        }


        //todo - 법무부 데이터는 주소값이 아예 없어서 일단 필터링은 제거하고 지역 관련 차트 없이 표출하는 것으로 변경
//        anmEvents = anmEvents.stream().filter(item-> chkAddr(item.getAddr())).collect(Collectors.toList());
//        for(EventType events : anmEvents){
//            String znNm = events.getAddr().split(" ")[2];
//            List<CodeInfo> znInfo = znCdList.stream().filter(item-> item.getCodeNm().equals(znNm)).collect(Collectors.toList());
//            if(!znInfo.isEmpty()){
//                events.setAreaCd(znInfo.get(0).getCodeCd());
//            }
//        }

        MonthStat fireMonth = getMonthStat(fireEvents, startDtm, endDtm, ApiConstant.EVENT_CD.FIRE);
        MonthStat policeMonth = getMonthStat(policeNoDispatchEvents, startDtm, endDtm, ApiConstant.EVENT_CD.POLICE);
        MonthStat dispatchMonth = getMonthStat(dispatchEvents, startDtm, endDtm, ApiConstant.EVENT_CD.DISPATCH);
        MonthStat safetyMonth = getMonthStat(safetyEvents, startDtm, endDtm, ApiConstant.EVENT_CD.SAFETY);
        MonthStat ndmMonth = getMonthStat(ndmEvents, startDtm, endDtm, ApiConstant.EVENT_CD.NDM);
        MonthStat anmMonth = getMonthStat(anmEvents, startDtm, endDtm, ApiConstant.EVENT_CD.ANM);

        List<MonthStat> result = new ArrayList<>();
        result.add(fireMonth);
        result.add(policeMonth);
        result.add(dispatchMonth);
        result.add(safetyMonth);
        result.add(ndmMonth);
        result.add(anmMonth);

        return result;

    }

    public boolean chkAddr(String addr){
        List<String> splitAddr = Arrays.stream(addr.split(" ")).collect(Collectors.toList());

        if(splitAddr.size() >= 3){
            String znNm = splitAddr.get(2);
            return znNm.contains("읍") || znNm.contains("면") || znNm.contains("동");
        }else{
            return false;
        }
    }

    public MonthStat getMonthStat(List<EventType> eventList, String startDtm, String endDtm, String eventType ) {
        List<StatType> dateStatList = getDateList(eventList, startDtm, endDtm);
        List<StatType> typeStatList = getTypeList(eventList, eventType);
        List<StatType> areaStatList = getAreaList(eventList);
        List<StatType> top5 = areaStatList.subList(0, Math.min(5, areaStatList.size()));
        Optional<StatType> maxObj = typeStatList.stream().max(Comparator.comparingInt(StatType::getCount));
        Optional<StatType> maxArea = top5.stream().max(Comparator.comparingInt(StatType::getCount));
        String maxType = "";
        String maxAreaNm = "";
        int maxTypeCnt = 0;
        int maxAreaCnt = 0;
        if(maxObj.isPresent()){
            maxType = maxObj.get().getType();
            maxTypeCnt = maxObj.get().getCount();
        }

        if(maxArea.isPresent()){
            maxAreaNm = maxArea.get().getType();
            maxAreaCnt = maxArea.get().getCount();
        }

        return new MonthStat(eventList.size(), eventType, eventType.equals(ApiConstant.EVENT_CD.DISPATCH)? "순찰차출동영상" : maxType, maxTypeCnt, maxAreaNm,maxAreaCnt, typeStatList, dateStatList, top5);
    }

    public List<StatType> getTypeList(List<EventType> eventList,String svcThemeCd) {

        Map<String, List<EventType>> groupByEventNm = eventList.stream().collect(Collectors.groupingBy(EventType::getEventNm));
        List<StatType> statList = new ArrayList<>();
        if(!svcThemeCd.equals(ApiConstant.EVENT_CD.DISPATCH)){
            List<String> eventNmList = eventDao.getTypeList(svcThemeCd);
            for(String eventNm : eventNmList){
                if(groupByEventNm.containsKey(eventNm)){
                    statList.add(new StatType(eventNm, groupByEventNm.get(eventNm).size()));
                }else{
                    statList.add(new StatType(eventNm, 0));
                }
            }
        }else{
            statList.add(new StatType("순찰차출동영상", groupByEventNm.get("순찰차출동영상").size()));
        }

        statList.sort(Comparator.comparing(StatType::getType));
        return statList;
    }

    public List<StatType> getDateList(List<EventType> eventList, String startDtm, String endDtm){
        Map<String, List<EventType>> groupMonth = groupByMonthDay(eventList);
        List<String> dateList = getDateList(startDtm, endDtm);
        List<StatType> statList = new ArrayList<>();
        for(String date : dateList){
            if(groupMonth.containsKey(date)){
                statList.add(new StatType(date, groupMonth.get(date).size()));
            }else{
                statList.add(new StatType(date, 0));
            }
        }
        return statList;
    }

    public List<StatType> getAreaList(List<EventType> eventList) {
        Map<String, List<EventType>> groupByArea = eventList.stream().collect(Collectors.groupingBy(EventType::getAreaCd));

        List<CodeInfo> areaList = eventDao.getAreaList();
        List<StatType> statList = new ArrayList<>();
        for(CodeInfo area : areaList){
            if(groupByArea.containsKey(area.getCodeCd())){
                statList.add(new StatType(area.getCodeNm(), groupByArea.get(area.getCodeCd()).size()));
            }else{
                statList.add(new StatType(area.getCodeNm(), 0));
            }
        }
        statList.sort((a, b) -> Integer.compare(b.getCount(), a.getCount()));

        return statList;
    }

    public String getToday() {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return today.format(formatter);
    }

    public List<String> getDateList(String startDtm, String endDtm){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate startDate = LocalDate.parse(startDtm, formatter);
        LocalDate endDate = LocalDate.parse(endDtm, formatter);

        List<String> datesInRange = new ArrayList<>();
        LocalDate currentDate = startDate;

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MM/dd");

        while (!currentDate.isAfter(endDate)) {
            // 날짜를 MM/dd 형식으로 변환하여 리스트에 추가
            datesInRange.add(currentDate.format(outputFormatter));

            // 날짜를 하루씩 증가
            currentDate = currentDate.plusDays(1);
        }

        return datesInRange;
    }


    public Map<String, List<EventType>> groupByHour(List<EventType> events) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        DateTimeFormatter hourFormatter = DateTimeFormatter.ofPattern("HH"); // 시간까지 추출

        return events
                .stream()
                .collect(Collectors.groupingBy(event -> {
                    LocalDateTime dateTime = LocalDateTime.parse(event.getOutbDtm().substring(0,14), inputFormatter);
                    return dateTime.format(hourFormatter); // yyyyMMddHH 형태로 그룹핑
                }));
    }

    public static Map<String, List<EventType>> groupByMonthDay(List<EventType> events) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        DateTimeFormatter mmddFormatter = DateTimeFormatter.ofPattern("MM/dd");

        return events.stream()
                .collect(Collectors.groupingBy(event -> {
                    LocalDateTime dateTime = LocalDateTime.parse(event.getOutbDtm().substring(0,14), inputFormatter);
                    return dateTime.format(mmddFormatter); // MM/dd 형식으로 리턴
                }));
    }


}
