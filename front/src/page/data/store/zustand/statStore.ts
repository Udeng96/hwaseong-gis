import {create} from "zustand/react";
import {MonthStatType, StatType, TodayStatType} from "../../../conf/interface/stat/statInterface";
import moment from "moment";
import {STAT_EVENT_TYPE_LIST, STAT_TYPE} from "../../../conf/const/stat/statConst";
import {EventItemType} from "../../../conf/interface/event/eventInterface";

interface StatStoreType {
    activeType: string,
    isSearch: string,
    isExcelRequest : string,
    todayStatList: TodayStatType[],
    monthStatList: MonthStatType[],
    dateStatList: MonthStatType[],
    facStatList : StatType[],
    excelEventList : EventItemType[],
    startDtm : string,
    endDtm : string
    actions: {
        setActiveType: (activeType: string) => void;
        setIsSearch: (isSearch: string) => void;
        setIsExcelRequest : (isExcelRequest : string) => void;
        setTodayStatList: (todayStatList: TodayStatType[]) => void;
        setMonthStatList: (monthStatList: MonthStatType[]) => void;
        setDateStatList: (dateStatList: MonthStatType[]) => void;
        setFacStatList : (facStatList : StatType[]) => void;
        setExcelEventList : (excelEventList : EventItemType[])=> void;
        setStartDtm : (startDtm : string) => void;
        setEndDtm : (endDtm : string) => void;
    }
}

export const useStatStore = create<StatStoreType>((set) => ({
    activeType: STAT_TYPE.TODAY+"_"+STAT_EVENT_TYPE_LIST[0].cd,
    isSearch : "request",
    isExcelRequest : "none",
    searchStatType: "",
    todayStatList: [],
    monthStatList: [],
    dateStatList: [],
    facStatList : [],
    excelEventList : [],
    startDtm : moment().subtract(1,'months').format("YYYYMMDD"),
    endDtm : moment().format("YYYYMMDD"),
    actions: {
        setActiveType: (activeType) => set({activeType}),
        setIsSearch: (isSearch)=> set({isSearch}),
        setIsExcelRequest : (isExcelRequest) => set({isExcelRequest}),
        setTodayStatList: (todayStatList) => set({todayStatList}),
        setMonthStatList: (monthStatList) => set({monthStatList}),
        setDateStatList: (dateStatList) => set({dateStatList}),
        setFacStatList : (facStatList) => set({facStatList}),
        setExcelEventList : (excelEventList) => set({excelEventList}),
        setStartDtm : (startDtm) => set({startDtm}),
        setEndDtm : (endDtm) => set({endDtm}),
    }
}))

