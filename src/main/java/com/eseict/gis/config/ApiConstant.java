package com.eseict.gis.config;

import com.localhostmon.base.SystemProperties;
import com.google.common.collect.Lists;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ApiConstant {

    public static final String HOME_PATH = SystemProperties.getProperty("GIS_HOME");
    public static final Boolean IS_DEV = Boolean.parseBoolean(SystemProperties.getProperty("IS_DEV"));
    public static final String API_PRODUCES = "application/json;charset=utf8";


    public class Common{
        public static final String ENCODING = "UTF-8";
        public static final String API_PRODUCES = "application/json;charset=utf8";
        public static final String TIME_ZONE = "Asia/Seoul";
    }

    public class Result{
        public static final String SUCCESS_CODE = "SUCCESS";
        public static final String FAIL_CODE = "FAIL";
        public static final String OMS_SUCCESS_CODE = "OK";
    }

    public class DATE{
        public static final String FORMAT_4 = "yyyy";
        public static final String FORMAT_6 = "yyyyMM";
        public static final String FORMAT_8 = "yyyyMMdd";
        public static final String FORMAT_10 = "yyyyMMddHH";
        public static final String FORMAT_12 = "yyyyMMddHHmm";
        public static final String FORMAT_14 = "yyyyMMddHHmmss";
        public static final String FORMAT_17 = "yyyyMMddHHmmssSSS";
        public static final String FORMAT_FRONT = "yyyy-MM-dd HH:mm:ss";
        public static final String MILLISECOND_ONE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        public static final String MILLISECOND_FULL_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";
        public static final String YEAR_TO_MINUTE_FORMAT = "yyyy-MM-dd HH:mm";
        public static final String DTM_TXT_FORMAT_8 = "yyyy/MM/dd";
        public static final String HOUR_MINUTE_FORMAT = "HHmm";
        public static final String HOUR_FORMAT = "HH";
        public static final String STAT_D = "MM-dd";
        public static final String STAT_M = "yyyy-MM";
        public static final String STAT_Y = "yyyy";
    }

    public class Schema{
        public static final String ioc = "rino_ioc";
        public static final String oms = "rino_oms";
        public static final String fms = "rino_fms";
    }

    public class EVENT_CD{
        public static final String POLICE = "POL";
        public static final String FIRE = "FFT";
        public static final String SAFETY = "SWE";
        public static final String EMS = "CTR";
        public static final String NDM = "NDM"; // 재난상황(Tpm)
        public static final String ANM = "ANM";// 법무부(Tpm);
        public static final String DISPATCH = "POL001M";
    }

    public class FAC_CLFY{
        public static final String CRIME = "FCC_0e3b16826fed43e88b7e9beeaa2a1622";
        public static final String TRAFFIC = "FCC_46572f5370e94a3c86b03cf28b85a9ae";
        public static final String BELL = "FCC_83b614f2dd7d4f869cd8eeae5a2ac29b";
        public static final String MANG = "FCC_9e98551afb9b497f862b39a35668a443";
        public static final String VMS = "FCC_02490a2542e74f5796a496f57393b18a";
        public static final String VDS = "FCC_cdaf1de875b34e2589ebe947e25f56ea";
        public static final String BIT = "FCC_b4eb3c94c2a6494caafdcc5a8ae964a9";
    }

    public static final List<String> FAC_CLFY_LIST = Arrays.asList(FAC_CLFY.CRIME, FAC_CLFY.TRAFFIC, FAC_CLFY.BELL, FAC_CLFY.MANG, FAC_CLFY.VMS, FAC_CLFY.VDS, FAC_CLFY.BIT);
    public static final List<String> EVENT_SVC_LIST = Arrays.asList(EVENT_CD.FIRE, EVENT_CD.POLICE, EVENT_CD.SAFETY);






}
