import moment from "moment/moment";

export const EVENT_RESULT_TYPE = {
    request : "REQUEST",
    success : "SUCCESS",
    empty : "NONE",
    error : "ERROR"
}


export const EVENT_SEARCH_DATE = {
    YEAR : {
        cd : 'one_year',
        nm : '1년',
        startDtm : moment().subtract(1,'years').format("YYYYMMDD")
    },
    SIX_MONTH:{
        cd : 'six_month',
        nm : '6개월',
        startDtm : moment().subtract(6, "months").format("YYYYMMDD")
    },
    THREE_MONTH: {
        cd : 'three_month',
        nm : '3개월',
        startDtm : moment().subtract(3, "months").format("YYYYMMDD")
    },
    ONE_MONTH: {
        cd : 'one_month',
        nm : '1개월',
        startDtm : moment().subtract(1,'months').format("YYYYMMDD"),
    },
    ONE_WEEK: {
        cd : 'one_week',
        nm : '1주일',
        startDtm: moment().subtract(1,'weeks').format("YYYYMMDD")
    }
}

export const EVENT_SEARCH_DATE_LIST = [EVENT_SEARCH_DATE.YEAR, EVENT_SEARCH_DATE.SIX_MONTH, EVENT_SEARCH_DATE.THREE_MONTH,EVENT_SEARCH_DATE.ONE_MONTH, EVENT_SEARCH_DATE.ONE_WEEK]


