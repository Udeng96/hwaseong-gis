

export const isDev= process.env.NODE_ENV === "development"
export const DOMAIN =  window.location.host;
export const CENTER = [37.208704, 127.034740];
export const SAFETY_ID = "SWE001";
export const VWORLD_DOMAIN = isDev ? `https://xdworld.vworld.kr` : `http://${DOMAIN}/proxy?https://xdworld.vworld.kr`;
export const API_URL :string = isDev ? `http://localhost:28089/gisNew` : `http://${DOMAIN}/gisNew`;
export const OMS :string = isDev ? `http://localhost:11919/oms` : `http://127.0.0.1/oms`;

export const API_WS_URL : string = isDev ? `ws://localhost:28089/gisNew/rino/event` : `ws://${DOMAIN}/gisNew/rino/event`;

export const STREAM_URL_CRIME = `ws://${DOMAIN}/xeus-gate-1/stream`;
export const STREAM_URL_TRAFFIC = `ws://${DOMAIN}/xeus-gate-2/stream`;

export const OMS_CONTEXT = {
    OMS_VIEW : `/login/goSysSelView`,
    LOG_OUT : `/api/user/logout`,
    LOG_IN : `/login/getLoginView`,
}
export const API_CONTEXT = {

    COMMON : {
        EVENT_TYPE : `/common/type/event`,
        CCTV_TYPE : `/common/type/cctv`,
        AREA : `/common/type/area`,
        USER : `/common/user/info`,
        SYS_INFO : `/common/user/sysInfo`,
        LOG_OUT : `/common/user/logout`
    },

    ADDR : {
        SEARCH : `/vworld/search`
    },

    WEATHER : {
        INFO : `/weather/info`,
        REPORT : `/weather/report`,
    },

    EVENT : {
        LIST : `/event/list`,
        HEATMAP : `/event/heatmap`,
        EXCEL : `/event/excel`,
    },

    CCTV : {
        LIST : `/cctv/list`
    },

    LEGEND : {
        LIST : `/fac/legend/list`
    },

    STAT :{
        TODAY : `/stat/today`,
        MONTH : `/stat/month`,
        FAC : `/stat/fac`,
    }

}