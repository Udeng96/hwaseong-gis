export interface EventItemType {
    seqn : string,
    eventCd : string,
    eventNm : string,
    znCd : string,
    znNm  : string,
    addr : string,
    outbDtm : string,
    cntn : string,
    lat : string,
    lon : string
}

export interface EventParamType{
    eventType : string,
    area : string,
    content : string,
    startDtm : string,
    endDtm : string,
    limit : string
}

export interface EventHeatmapType{
    lat:number,
    lng:number,
    count:number,
}

export interface EventWebSocketType{
    StatEvet : StatEvetType,
}

export interface StatEvetType{
    cpxRelEvetOutbSeqnCnt : string,
    outbMainGb : string,
    outbPos : EvetPos[],
    outbPosCnt : number,
    outbPosNm : string,
    outbScopRads : string,
    procSt : string,
    statEvetActnCntn : string,
    statEvetActnDtm : string,
    statEvetActcMn : string,
    statEvetCntn : string,
    statEvetGdCd : string,
    statEvetId : string,
    statEvetItem : StatEvetItem[]
    statEvetItemCnt : number,
    statEvetNm : string,
    statEvetOutbDtm :string,
    uSvcOutbId : string,
}

export interface EvetPos{
    x: number,
    y: number,
    z: string
}

export interface StatEvetItem{
    value : string,
    key : string,
}