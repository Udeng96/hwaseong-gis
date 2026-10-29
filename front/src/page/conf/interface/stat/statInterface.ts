export interface StatType{
    type : string,
    count : number,
}

export interface EventType{
    seqn: string,
    eventType : string,
    eventNm : string,
    areaCd : string,
    addr : string,
    outbDtm : string,
    cntn : string
}

export interface TodayStatType{
    eventCd : string,
    totalCnt : number,
    timeStat : StatType[],
    eventList : EventType[]
}

export interface MonthStatType{
    allCnt : number,
    eventCd : string,
    mostType : string,
    mostTypeCnt : number,
    mostArea : string,
    mostAreaCnt : number,
    typeStatList : StatType[],
    dateStatList : StatType[],
    areaStatList : StatType[],
}