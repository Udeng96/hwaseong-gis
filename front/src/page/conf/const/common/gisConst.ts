import {FacIconType, MapLayerType} from "../../interface/common/gisInterface";
import {VWORLD_DOMAIN} from "../../config/config";
import {CctvSelectOptionType} from "../../interface/cctv/cctvInterface";
import moment from "moment/moment";

export enum MapMoveEnum {
    none,
    normal,
    event,
    event_disaster,
    max_zoom,
    plus_zoom
}

export const MAP_LAYER_TYPE : MapLayerType  = {
    "NORMAL" :  {
        type : 'normal',
        url : `${VWORLD_DOMAIN}/2d/Base/service/{z}/{x}/{y}.png`
    },
    "SATE" : {
        type : 'satellite',
        url : `${VWORLD_DOMAIN}/2d/Satellite/service/{z}/{x}/{y}.jpeg`
    },
    "SATE_LABEL" : {
        type : 'satellite_label',
        url : `${VWORLD_DOMAIN}/2d/Hybrid/service/{z}/{x}/{y}.png`
    },
}

export const FAC_ICON_ID : FacIconType = {
    VMS : 'vms',
    미세먼지 : 'dust',
    비상벨 : 'emergencyBell',
    광통신망정보 : 'ocn',
    무인국사 : 'unmanned',
    BIT : 'bit',
    VDS : 'vds',
    수위계 : 'water'
}

export const GIS_FUNC = {
    NONE : "none",
    CLEAR : "clear",
    POLYLINE : "polyline",
    POLYGON : "polygon",
    CASTNET : "castNet",
    CIRCLE : "circle",
}

export const HeatmapDate : CctvSelectOptionType[] = [
    {value: '', label: '전체'},
    {value: moment().subtract(1,'month').format('YYYYMMDD'), label: '1개월'},
    {value: moment().subtract(3,'months').format('YYYYMMDD'), label: '3개월'},
    {value: moment().subtract(6,'months').format('YYYYMMDD'), label: '6개월'},
]
