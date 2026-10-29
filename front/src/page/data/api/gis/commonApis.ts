import axios from "axios";
import {API_CONTEXT, API_URL} from "../../../conf/config/config";

export const fetchSearchAddr = async (param:{address:string, type : string}) => {
    return await axios.get(API_URL + API_CONTEXT.ADDR.SEARCH,{
        params : {
            address : param.address,
            type : param.type
        }
    })
}

