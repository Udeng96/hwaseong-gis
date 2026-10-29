import axios from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config";
import { AxiosResponse} from "axios";
import {MonthStatType, StatType, TodayStatType} from "../../../conf/interface/stat/statInterface";

export const fetchStatTodayList = async () : Promise<AxiosResponse<TodayStatType[]>> => {
    return axios.get(API_URL+API_CONTEXT.STAT.TODAY);
}

export const fetchStatDateList = async (props:{param:{startDtm : string, endDtm : string}}) : Promise<AxiosResponse<MonthStatType[]>> => {
    return axios.get(API_URL+API_CONTEXT.STAT.MONTH, {
        params : props.param,
    });
}

export const fetchStatFac = async() : Promise<AxiosResponse<StatType[]>> => {
    return axios.get(API_URL+API_CONTEXT.STAT.FAC)
}