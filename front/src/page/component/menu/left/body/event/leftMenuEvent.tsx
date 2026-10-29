import React, {useEffect} from "react";
import LeftMenuSearch from "../search/leftMenuSearch";
import LeftMenuEventBodyList from "./leftMenuEventBodyList";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import {useEventStore} from "../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import {fetchEventTypeList} from "../../../../../data/api/common/commonApis";
import {useQuery} from "@tanstack/react-query";
import {useLastEventStore} from "../../../../../data/store/zustand/lastEventStore";
import AlarmPlayer from "../../../../common/player/alarmPlayer.tsx";

const LeftMenuEvent = () => {

    const {activeLeftMenu} = useCommonStore(useShallow((state) => ({activeLeftMenu : state.activeLeftMenu})));
    const {eventTypeList, setEventTypeList, setSelectEventOption} = useEventStore(useShallow((state)=> ({
        eventTypeList : state.eventTypeList,
        setEventTypeList : state.actions.setEventTypeList,
        setSelectEventOption : state.actions.setSelectEventOption
    })))

    const setSelectTypeOption = useLastEventStore.getState().actions.setSelectTypeOption
    const selectTypeOption = useLastEventStore((state)=> state.selectTypeOption);

    const {data: eventTypeRes} = useQuery({
        queryKey : ['eventTypeList'],
        queryFn : () => fetchEventTypeList(),
        enabled : eventTypeList.length === 0,
    })

    useEffect(()=>{
        if(eventTypeRes){
            setEventTypeList(eventTypeRes.data)
            setSelectEventOption([...eventTypeRes.data.map((type)=> type.codeCd+"/"+type.codeNm), "all/전체"]);
            setSelectTypeOption([...eventTypeRes.data.map((type)=> type.codeCd+"/"+type.codeNm), "all/전체"]);
        }
    },[eventTypeRes])


    return (
        <div className={`wrap event_wrap ${activeLeftMenu === LEFT_TAB_MENU[0].cd ? '' : 'disabled'}`} id={"tab1"}>
            <LeftMenuSearch/>
            <LeftMenuEventBodyList/>
        </div>
    )


}

export default LeftMenuEvent