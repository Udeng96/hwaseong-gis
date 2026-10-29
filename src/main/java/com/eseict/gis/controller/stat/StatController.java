package com.eseict.gis.controller.stat;

import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.stat.MonthStat;
import com.eseict.gis.domain.dto.stat.StatType;
import com.eseict.gis.domain.dto.stat.TodayStat;
import com.eseict.gis.service.stat.StatService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin("*")
@RestController
@RequestMapping(value="/stat", produces = ApiConstant.API_PRODUCES)
public class StatController {

    @Autowired
    StatService statService;

    @GetMapping("/today")
    public ResponseEntity<List<TodayStat>> getTodayStat(){
        return ResponseEntity.ok(statService.getTodayStatList());
    }

    @GetMapping("/month")
    public ResponseEntity<List<MonthStat>> getMonthStat(
            @RequestParam(value = "startDtm", defaultValue = "") String startDtm,
            @RequestParam(value = "endDtm", defaultValue = "") String endDtm
    ){
        return ResponseEntity.ok(statService.getMonthStatList(startDtm, endDtm));
    }

    @GetMapping("/fac")
    public ResponseEntity<List<StatType>> getFacStat(){
        return ResponseEntity.ok(statService.getFacCntList());
    }

}
