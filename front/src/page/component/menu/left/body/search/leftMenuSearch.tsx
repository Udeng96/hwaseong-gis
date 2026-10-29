import React, {useEffect, useState} from "react";
import moment from "moment";
import {EventParamType} from "../../../../../conf/interface/event/eventInterface";
import {fetchEventList} from "../../../../../data/api/event/eventApis";
import {EVENT_RESULT_TYPE} from "../../../../../conf/const/event/eventConst";
import TypeOption from "../event/search/typeOption";
import CntnOption from "../event/search/cntnOption";
import AreaOption from "../event/search/areaOption";
import {useEventStore} from "../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "@tanstack/react-query";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {MODAL_TYPE} from "../../../../../conf/const/common/commonConst";
import AlarmPlayer from "../../../../common/player/alarmPlayer.tsx";

const LeftMenuSearch = () => {

    const {
        eventList,
        selectAreaOption,
        selectCntnOption,
        selectEventOption,
        eventSearchType,
        setEventSearchType,
        setEventList,
        setActiveEvent
    } = useEventStore(useShallow((state) => ({
        eventList: state.eventList,
        selectAreaOption: state.selectAreaOption,
        selectCntnOption: state.selectCntnOption,
        selectEventOption: state.selectEventOption,
        eventSearchType: state.eventSearchType,
        setEventSearchType: state.actions.setEventSearchType,
        setEventList: state.actions.setEventList,
        setActiveEvent: state.actions.setActiveEvent
    })))

    const setActiveModal = useCommonStore.getState().actions.setActiveModal;

    const [updateDate, setUpdateDate] = useState<string>(moment().format("YYYY-MM-DD HH:mm:ss"));

    const payload: EventParamType = {
        eventType: selectEventOption.map((opt) => opt.split("/")[0]).filter((v) => v !== "" && v !== "all").join(","),
        area: selectAreaOption,
        content: selectCntnOption,
        startDtm: "",
        endDtm: "",
        limit: "50"
    }

    const {data: eventRes, error: eventErr} = useQuery({
        queryKey: ['eventList'],
        queryFn: () => fetchEventList(payload),
        enabled: eventSearchType === EVENT_RESULT_TYPE.request
    })

    useEffect(() => {
        if (eventRes) {
            if (eventRes.data.length > 0) {
                setEventList(eventRes.data);
            } else {
                setEventList([]);
            }
            setEventSearchType(EVENT_RESULT_TYPE.success)
        }
    }, [eventRes])

    useEffect(() => {
        if (eventErr) {
            setEventSearchType(EVENT_RESULT_TYPE.error);
        }
    }, [eventErr])

    useEffect(() => {
        if (eventSearchType === EVENT_RESULT_TYPE.request) {
            setUpdateDate(moment().format("YYYY-MM-DD HH:mm:ss"));
        }
    }, [eventSearchType])

    const handleSearchBtn = () => {
        setActiveEvent(null);
        setEventSearchType(EVENT_RESULT_TYPE.request);
    }


    return (
        <>
            <AlarmPlayer/>
            <div className={"event_search_setting"}>
                <div className={"event_search_header"}>
                    <h2 className={"event_search_title"}>이벤트 검색 조건 설정</h2>
                    <button className={"statistics_btn"} onClick={() => setActiveModal(MODAL_TYPE.STAT)}>
                        <div className={"statistics_icon"}/>
                        통계
                    </button>
                    <button className={"event_history_btn"} onClick={() => setActiveModal(MODAL_TYPE.EVENT_LAST)}>지난 이벤트
                        내역
                    </button>
                </div>
                <TypeOption/>
                <CntnOption/>
                <AreaOption/>
                <button className={"event_search_btn"} onClick={() => handleSearchBtn()}><span>검색</span></button>
            </div>
            <div className={"event_search_result_info"}>
                                <span className={"search_options"}>
                                    <span
                                        className={"search_result"}>&nbsp;&nbsp;{`검색결과 [${eventList ? eventList.length : '0'}]`}</span>
                                </span>
                <span className={"update_time"}>{`Update : ${updateDate}`}</span>
            </div>
        </>

    )


}

export default LeftMenuSearch