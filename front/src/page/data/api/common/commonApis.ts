import axios, {AxiosResponse} from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config";
import Cookies from "js-cookie";
import {CodeType, SysType, UserType} from "../../../conf/interface/common/commonInterface";

export const fetchEventTypeList = async () : Promise<AxiosResponse<CodeType[]>> => {
    return await axios.get(API_URL + API_CONTEXT.COMMON.EVENT_TYPE);
}

export const fetchCctvTypeList = async () : Promise<AxiosResponse<CodeType[]>> => {
    return await axios.get(API_URL + API_CONTEXT.COMMON.CCTV_TYPE);
}

export const fetchAreaList = async () => {
    return await axios.get(API_URL + API_CONTEXT.COMMON.AREA);
}

export const fetchWeatherInfo = async (param:{baseDate:string}) => {
    return await axios.get(API_URL + API_CONTEXT.WEATHER.INFO,{
        params:{
            baseDate : param.baseDate
        }
    });
}

export const fetchReportInfo = async (param:{baseDate:string}) => {
    return await axios.get(API_URL + API_CONTEXT.WEATHER.REPORT,{
        params:{
            baseDate : param.baseDate
        }
    });
}

export const fetchUserInfo = async () : Promise<AxiosResponse<UserType>> => {
    let token = Cookies.get('token');
    return await axios.get(API_URL + API_CONTEXT.COMMON.USER,{
        params : {
            token : token
        }
    })
}

export const fetchSysList = async () : Promise<AxiosResponse<SysType[]>> => {
    let token = Cookies.get('token');
    return await axios.get(API_URL + API_CONTEXT.COMMON.SYS_INFO,{
        params : {
            token : token
        }
    })
}