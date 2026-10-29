export interface LegendType{
    legendId : string,
    legendNm : string,
    facInfos : FacInfoType[],
}

export interface FacInfoType{
    facId : string,
    facNm : string,
    facAddr : string,
    facClfyId : string,
    facClfyNm : string,
    facLat : string,
    facLon : string,
    creDtm : string,
    mgtNo : string,
}