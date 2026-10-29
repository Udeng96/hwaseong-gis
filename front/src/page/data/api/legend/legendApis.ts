import axios from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config.ts";

export const fetchLegendTypeList = async () => {
    return axios.get(API_URL+API_CONTEXT.LEGEND.LIST);
}