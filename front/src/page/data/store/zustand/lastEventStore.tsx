import {create} from "zustand/react";
import {EventItemType} from "../../../conf/interface/event/eventInterface";
import {EVENT_RESULT_TYPE, EVENT_SEARCH_DATE} from "../../../conf/const/event/eventConst";
import moment from "moment";

interface LastEventStoreType{

    lastSearchEventType : string,
    lastEventList : EventItemType[];
    selectPeriod : string,
    selectStartDtmOption : string;
    selectEndDtmOption : string;
    selectTypeOption : string[];
    selectContentOption : string;
    selectAddrOption : string;
    activePage : number,
    activeItem : EventItemType | null,
    actions : {
        setLastSearchEventType : (lastSearchEventType : string) => void,
        setLastEventList : (lastEventList : EventItemType[]) => void,
        setSelectPeriod : (selectPeriod: string)=> void,
        setSelectStartDtmOption : (selectStartDtmOption : string) => void,
        setSelectEndDtmOption : (selectEndDtmOption : string) => void,
        setSelectTypeOption : (selectTypeOption : string[]) => void,
        setSelectContentOption : (selectContentOption : string) => void,
        setSelectAddrOption : (selectAddrOption : string) => void,
        setActivePage : (activePage : number) => void,
        setActiveItem : (activeItem : EventItemType | null ) => void,
    }
}

export const useLastEventStore = create<LastEventStoreType>((set)=>({
    lastSearchEventType : EVENT_RESULT_TYPE.request,
    lastEventList : [],
    selectPeriod : EVENT_SEARCH_DATE.ONE_WEEK.cd,
    selectStartDtmOption : moment().subtract(1,'week').format('YYYYMMDD'),
    selectEndDtmOption : moment().format("YYYYMMDD"),
    selectTypeOption : [],
    selectContentOption : "",
    selectAddrOption : "",
    activePage : 1,
    activeItem : null,

    actions : {
        setLastSearchEventType : (lastSearchEventType) => set({lastSearchEventType}),
        setLastEventList : (lastEventList) => set({lastEventList}),
        setSelectPeriod : (selectPeriod) => set({selectPeriod}),
        setSelectStartDtmOption : (selectStartDtmOption) => set({selectStartDtmOption}),
        setSelectEndDtmOption : (selectEndDtmOption) => set({selectEndDtmOption}),
        setSelectTypeOption : (selectTypeOption) => set({selectTypeOption}),
        setSelectContentOption : (selectContentOption) => set({selectContentOption}),
        setSelectAddrOption : (selectAddrOption) => set({selectAddrOption}),
        setActivePage : (activePage) => set({activePage}),
        setActiveItem : (activeItem) => set({activeItem}),
     }
}))

