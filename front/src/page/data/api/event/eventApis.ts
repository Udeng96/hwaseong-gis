import axios, {AxiosResponse} from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config";
import {EventItemType, EventParamType} from "../../../conf/interface/event/eventInterface";


export const fetchEventList = async (params : EventParamType) => {

    return await axios.get(API_URL+API_CONTEXT.EVENT.LIST,{
        params : {
            eventType : params.eventType,
            area : params.area,
            content : params.content,
            startDtm : params.startDtm,
            endDtm : params.endDtm,
            limit : params.limit
        }
    })
}

export const fetchHeatmapList = async (params : {startDtm : string,  endDtm : string, statEvetCd:string})=>{
    return await axios.get(API_URL+API_CONTEXT.EVENT.HEATMAP,{
        params : {
            startDtm : params.startDtm,
            endDtm : params.endDtm,
            statEvetCd : params.statEvetCd
        }
    })
}

export const fetchExcelEventList = async (params : {eventType: string, startDtm : string, endDtm : string}) : Promise<AxiosResponse<EventItemType[]>> => {
    return await axios.get(API_URL+API_CONTEXT.EVENT.EXCEL,{
        params : {
            eventType : params.eventType,
            startDtm : params.startDtm,
            endDtm : params.endDtm
        }
    })
}