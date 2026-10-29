import axios, {AxiosResponse} from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config.ts";
import {CctvItemType, CctvParamType} from "../../../conf/interface/cctv/cctvInterface.ts";

export const fetchCctvList = async (param : CctvParamType) : Promise<AxiosResponse<CctvItemType[]>> => {
    return await axios.get(API_URL+API_CONTEXT.CCTV.LIST,{
        params :{
            cctvClfy : param.cctvClfy,
            cctvNm : param.cctvNm
        }
    })
}