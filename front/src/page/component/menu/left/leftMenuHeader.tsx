import {LEFT_TAB_MENU} from "../../../conf/const/common/commonConst";
import {useEffect, useState} from "react";
import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {useShallow} from "zustand/react/shallow";
import {useEventStore} from "../../../data/store/zustand/eventStore";
import {SAFETY_ID} from "../../../conf/config/config";
import {EventItemType} from "../../../conf/interface/event/eventInterface";
import WsEvent from "./body/event/ws/wsEvent";

const LeftMenuHeader = () => {


    const {activeLeftMenu, setActiveLeftMenu} = useCommonStore(useShallow((state) => ({
        activeLeftMenu: state.activeLeftMenu,
        setActiveLeftMenu: state.actions.setActiveLeftMenu
    })))

    const {
        setWsEventData,
        wsEventData,
        setIsSWEReceive,
        eventTypeList,
        eventList,
        setEventList,
        openEventList,
        setOpenEventList,
        setActiveEvent
    } = useEventStore(useShallow((state) => ({
        setWsEventData: state.actions.setWsEventData,
        wsEventData: state.wsEventData,
        setIsSWEReceive: state.actions.setIsSWEReceive,
        eventTypeList: state.eventTypeList,
        eventList: state.eventList,
        setEventList: state.actions.setEventList,
        openEventList: state.openEventList,
        setOpenEventList: state.actions.setOpenEventList,
        setActiveEvent: state.actions.setActiveEvent
    })))

    const [isSocketOpen, setIsSocketOpen] = useState<boolean>(true);


    WsEvent({isSocketOn: isSocketOpen});

    useEffect(() => {
        if (wsEventData) {
            if (wsEventData.StatEvet.statEvetId.substring(3, 9) === SAFETY_ID) {
                setIsSWEReceive(true);
            }
            let eventNm = "";
            eventTypeList.forEach((type) => {
                if (type.codeCd === wsEventData.StatEvet.statEvetId.substring(3, 6)) {
                    eventNm = type.codeNm;
                }
            })

            let newEvent: EventItemType = {
                seqn: wsEventData.StatEvet.uSvcOutbId,
                eventCd: wsEventData.StatEvet.statEvetId.substring(3, 6),
                eventNm: eventNm,
                znCd: wsEventData.StatEvet.statEvetId.substring(0, 3),
                znNm: "",
                addr: wsEventData.StatEvet.outbPosNm,
                outbDtm: wsEventData.StatEvet.statEvetOutbDtm,
                cntn: wsEventData.StatEvet.statEvetCntn,
                lat: wsEventData.StatEvet.outbPos[0].y.toString(),
                lon: wsEventData.StatEvet.outbPos[0].x.toString(),
            }

            let newEventList = [newEvent, ...eventList];
            if (newEventList.length > 50) {
                newEventList.pop()
            }

            setOpenEventList([wsEventData.StatEvet.uSvcOutbId, ...openEventList])
            setEventList(newEventList);
            setActiveEvent(newEvent);
            setWsEventData(null);
        }
    }, [wsEventData])


    return (
        <header className={"dashboard_header"}>
            <div className={"header_title"}>
                <h1 className={"title"}>관제<span>Dashboard</span></h1>
                <button className={`event_receive ${isSocketOpen ? 'active' : ''}`}
                        onClick={() => setIsSocketOpen(!isSocketOpen)}/>
            </div>
            <div className={"tab_menu_btn_grp"}>
                {/*만일 activeTabStore 가 해당 tab menu들과 일치한다면 active */}
                {
                    LEFT_TAB_MENU.map((menu) => (
                        <button
                            className={`tab_menu_btn ${menu.cd}_btn ${activeLeftMenu === menu.cd ? 'active' : ''}`}
                            onClick={() => setActiveLeftMenu(menu.cd)}><span>{menu.nm}</span></button>

                    ))
                }
            </div>
        </header>
    )

}

export default LeftMenuHeader