export interface CctvSelectOptionType {
    value : string,
    label : string,
    [key : string] : any,
}

export interface CctvSelectGroupOption {
    label : string;
    options : CctvSelectOptionType[];
}

export interface CctvParamType {
    cctvClfy : string,
    cctvNm : string,
}

export interface CctvItemType {
    cctvId : string,
    cctvNm : string,
    cctvClfy : string,
    cctvLat : string,
    cctvLon : string,
    mgtNo : string,

}