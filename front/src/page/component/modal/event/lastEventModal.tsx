import moment from "moment/moment";
import React, {useEffect, useState} from "react";
import {EventParamType} from "../../../conf/interface/event/eventInterface";
import {EVENT_RESULT_TYPE, EVENT_SEARCH_DATE} from "../../../conf/const/event/eventConst";
import LastEventModalListArea from "./lastEventModalListArea";
import LastEventModalDetail from "./lastEventModalDetail";
import LastEventModalSearch from "./search/lastEventModalSearch";
import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {MODAL_TYPE} from "../../../conf/const/common/commonConst";
import {useLastEventStore} from "../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "@tanstack/react-query";
import {fetchEventList} from "../../../data/api/event/eventApis";
import {useEventStore} from "../../../data/store/zustand/eventStore";

const LastEventModal = () => {

    const {activeModal, setActiveModal} = useCommonStore(useShallow((state)=> ({
        activeModal : state.activeModal,
        setActiveModal : state.actions.setActiveModal
    })))
    const {activePage,lastSearchEventType, lastEventList, selectStartDtmOption , selectEndDtmOption,
    selectTypeOption, selectContentOption, selectAddrOption,
    setLastSearchEventType, setLastEventList, setSelectStartDtmOption,
    setSelectEndDtmOption, setSelectTypeOption, setSelectContentOption, setSelectAddrOption, setSelectPeriod, setActivePage , setActiveItem} = useLastEventStore(useShallow((state)=> ({
        activePage : state.activePage,
        lastSearchEventType : state.lastSearchEventType,
        lastEventList : state.lastEventList,
        selectStartDtmOption : state.selectStartDtmOption,
        selectEndDtmOption : state.selectEndDtmOption,
        selectTypeOption : state.selectTypeOption,
        selectContentOption : state.selectContentOption,
        selectAddrOption : state.selectAddrOption,
        setLastSearchEventType : state.actions.setLastSearchEventType,
        setLastEventList : state.actions.setLastEventList,
        setSelectStartDtmOption : state.actions.setSelectStartDtmOption,
        setSelectEndDtmOption : state.actions.setSelectEndDtmOption,
        setSelectTypeOption : state.actions.setSelectTypeOption,
        setSelectContentOption : state.actions.setSelectContentOption,
        setSelectAddrOption : state.actions.setSelectAddrOption,
        setSelectPeriod : state.actions.setSelectPeriod,
        setActivePage : state.actions.setActivePage,
        setActiveItem : state.actions.setActiveItem

    })))

    const eventTypeList = useEventStore((state)=> state.eventTypeList)
    const [updateDate, setUpdateDate] = useState<string>(moment().format("YYYY-MM-DD HH:mm:ss"));

    let payload: EventParamType = {
        eventType: selectTypeOption.filter((item)=> item!=="" && item !== "all/전체").map((item)=> item.split("/")[0]).join(","),
        area: selectAddrOption,
        content: selectContentOption,
        startDtm: selectStartDtmOption,
        endDtm: selectEndDtmOption,
        limit: ""
    }

    const {data : lastEventRes, error : lastEventErr} = useQuery({
        queryKey : ['lastEventList'],
        queryFn : ()=> fetchEventList(payload),
        enabled : activeModal === MODAL_TYPE.EVENT_LAST && lastSearchEventType === EVENT_RESULT_TYPE.request
    })



    useEffect(()=>{
        if(lastEventRes){
            setLastEventList(lastEventRes.data);
            setLastSearchEventType(EVENT_RESULT_TYPE.success)
        }else{
            setLastEventList([]);
        }
    },[lastEventRes])
44
    useEffect(()=>{
        if(lastEventErr){
            setLastSearchEventType(EVENT_RESULT_TYPE.error);
            console.log("request_last_event_err : ", lastEventErr);
        }
    },[lastEventErr])


    const handleSearchBtn = () => {
        setLastSearchEventType(EVENT_RESULT_TYPE.request);
        setUpdateDate(moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    const handleClsModalBtn = () => {
        setLastSearchEventType(EVENT_RESULT_TYPE.request);
        setLastEventList([]);
        setSelectStartDtmOption(moment().subtract(1,'week').format('YYYYMMDD'));
        setSelectEndDtmOption(moment().format("YYYYMMDD"))
        setSelectTypeOption([...eventTypeList.map((type)=> type.codeCd+"/"+type.codeNm), "all/전체"]);
        setSelectAddrOption("");
        setSelectContentOption("");
        setSelectPeriod(EVENT_SEARCH_DATE.ONE_WEEK.cd)
        setActiveModal(MODAL_TYPE.NONE);
        setActivePage(1);
        setActiveItem(null);
    }

    return (
        <section className={`modal_last_event ${activeModal === MODAL_TYPE.EVENT_LAST ? 'active' : ''}`}>
            <div className={"modal_last_event_frame"}>
                <header className={"last_event_header"}>
                    <h1 className={"last_event_title"}>지난 이벤트 내역</h1>
                    <button className={"last_event_close_btn"} onClick={handleClsModalBtn}/>
                </header>
                <div className={"last_event_body"}>
                    <div className={"last_search_area"}>
                        <LastEventModalSearch/>
                        <button className={"search_btn"} onClick={handleSearchBtn}>검색</button>
                    </div>
                    <div className={"last_event_area"}>
                        <header className={"last_event_area_header"}>
                            <span className={"modal_search_result_info"}>검색결과[{lastEventList? lastEventList.length.toLocaleString() : '0'}] | 현재페이지[{activePage}]</span>
                            <span className={"modal_search_update"}>Update : {updateDate}</span>
                        </header>
                        <div className={"last_event_area_body"}>
                            <LastEventModalListArea/>
                            <LastEventModalDetail/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastEventModal