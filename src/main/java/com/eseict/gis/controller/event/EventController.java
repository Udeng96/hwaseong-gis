package com.eseict.gis.controller.event;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.controller.common.ViewController;
import com.eseict.gis.domain.dto.event.EventHeatmap;
import com.eseict.gis.domain.dto.event.EventHistItem;
import com.eseict.gis.service.event.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/event", produces = ApiConstant.API_PRODUCES)
public class EventController {

    @Autowired
    EventService eventService;

    private static final Logger logger = LoggerFactory.getLogger(ViewController.class);


    @GetMapping("/list")
    public List<EventHistItem> getEventList(
            @RequestParam(value = "eventType",required = false, defaultValue = "")String eventType,
            @RequestParam(value = "area",required = false, defaultValue = "")String area,
            @RequestParam(value = "content",required = false, defaultValue = "")String content,
            @RequestParam(value = "startDtm",required = false, defaultValue = "")String startDtm,
            @RequestParam(value = "endDtm",required = false, defaultValue = "")String endDtm,
            @RequestParam(value = "limit", required = false, defaultValue = "0")String limit
    ){
        return eventService.getEventHistList(eventType,area,content,startDtm,endDtm,Integer.parseInt(limit));
    }

    @GetMapping("/heatmap")
    public List<EventHeatmap> getEventHeatmap(
            @RequestParam(value = "startDtm", required = false, defaultValue = "")String startDtm,
            @RequestParam(value = "endDtm", required = false, defaultValue = "")String endDtm,
            @RequestParam(value = "statEvetCd", required = false, defaultValue = "") String statEvetCd
    ){

        return eventService.getHEatmapCountList(startDtm, endDtm, statEvetCd);

    }

    @GetMapping("/excel")
    public List<EventHistItem> getExcelEventList(
            @RequestParam(value = "eventType", required = false, defaultValue = "")String eventType,
            @RequestParam(value = "startDtm",required = false, defaultValue = "")String startDtm,
            @RequestParam(value = "endDtm",required = false, defaultValue = "")String endDtm
    ){
        return eventService.getExcelEventList(eventType,startDtm, endDtm);
    }



}
