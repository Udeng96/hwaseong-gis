import {create} from "zustand/react";
import {CodeType} from "../../../conf/interface/common/commonInterface";
import {EventItemType, EventWebSocketType} from "../../../conf/interface/event/eventInterface";
import {EVENT_RESULT_TYPE} from "../../../conf/const/event/eventConst";
import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";

interface EventStoreType{
    activeEvent : EventItemType | null,
    activeEventCctvList : CctvItemType[],
    eventSearchType : string,
    eventTypeList : CodeType[],
    eventList : EventItemType[],
    openEventList : string[],
    selectEventOption : string[],
    selectAreaOption : string,
    selectCntnOption : string,
    isSWEReceive : boolean,
    wsEventSocket : WebSocket | null,
    wsEventData : EventWebSocketType | null,

    actions:{
        setActiveEvent : (activeEvent: EventItemType | null) => void;
        setActiveEventCctvList : (activeEventCctvList : CctvItemType[]) =>  void,
        setEventSearchType : (eventSearchType:string) => void;
        setEventTypeList : (eventTypeList:CodeType[]) =>  void;
        setEventList : (eventList : EventItemType[]) => void;
        setOpenEventList : (openEventList : string[]) => void;
        setSelectEventOption : (selectEventOption : string[]) => void;
        setSelectAreaOption : (selectAreaOption : string) => void;
        setSelectCntnOption : (selectCntnOption : string) =>  void;
        setIsSWEReceive : (isSWEReceive : boolean) => void;
        setWsEventSocket : (wsEventSocket: WebSocket | null) => void;
        setWsEventData: (wsEventData: EventWebSocketType | null) => void;
    }
}

export const useEventStore = create<EventStoreType>((set)=> ({
    activeEvent : null,
    activeEventCctvList : [],
    eventSearchType : EVENT_RESULT_TYPE.request,
    eventTypeList : [],
    eventList : [],
    openEventList : [],
    selectEventOption : [],
    selectAreaOption : "",
    selectCntnOption : "",
    isSWEReceive : false,
    wsEventSocket : null,
    wsEventData : null,
    actions:{
        setActiveEvent : (activeEvent) => set({activeEvent}),
        setActiveEventCctvList : (activeEventCctvList) => ({activeEventCctvList}),
        setEventSearchType : (eventSearchType) => set({eventSearchType}),
        setEventTypeList : (eventTypeList) => set({eventTypeList}),
        setEventList : (eventList) => set({eventList}),
        setOpenEventList : (openEventList)=>set({openEventList}),
        setSelectEventOption : (selectEventOption)=> set({selectEventOption}),
        setSelectAreaOption : (selectAreaOption) => set({selectAreaOption}),
        setSelectCntnOption : (selectCntnOption : string) =>  set({selectCntnOption}),
        setIsSWEReceive : (isSWEReceive : boolean) => set({isSWEReceive}),
        setWsEventSocket : (wsEventSocket)=>set({wsEventSocket}),
        setWsEventData : (wsEventData) => set({wsEventData}),
    }
}))