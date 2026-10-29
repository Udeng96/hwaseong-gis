import {EventItemType} from "../../../../../../conf/interface/event/eventInterface";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import moment from "moment";
import React from "react";
import {useGisStore} from "../../../../../../data/store/zustand/gisStore";

const LeftMenuEventList = (props: { item: EventItemType }) => {

    const {openEventList, activeEvent, setActiveEvent, setOpenEventList} = useEventStore(useShallow((state) => ({
        openEventList: state.openEventList,
        activeEvent: state.activeEvent,
        setActiveEvent : state.actions.setActiveEvent,
        setOpenEventList : state.actions.setOpenEventList
    })));

    const setActiveEventCastCctvList = useGisStore.getState().actions.setActiveEventCastCctvList;

    const handleItem = () => {
        if(activeEvent){
            if(activeEvent.seqn === props.item.seqn){
                setActiveEvent(null);
                setActiveEventCastCctvList([]);

            }else{
                setActiveEvent(props.item);
            }
        }else{
            setActiveEvent(props.item);
        }
    }

    const handleDetailBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()

        if(openEventList.includes(props.item.seqn)){
            setOpenEventList(openEventList.filter((item)=> !item.includes(props.item.seqn)));
        }else{
            setOpenEventList([...openEventList, props.item.seqn]);
        }
    }

    const setCntnForm = () => {
        let result = props.item.cntn;
        if (props.item.eventCd === 'SWE') {
            let cntnSplit = props.item.cntn.split(',');
            result = cntnSplit.join('\n')
        }

        return result;
    }

    return (
        <ul className={`event_list_item 
        ${openEventList.includes(props.item.seqn) ? 'detail' : ''} 
        ${props.item.eventCd === 'SWE' ? 'wide' : ''} 
        ${activeEvent && (activeEvent.seqn === props.item.seqn) ? 'active' : ''}`}
            onClick={handleItem}
        >
            <li>{`${props.item.eventNm}`}</li>
            <li>{`${props.item.addr}`}</li>
            <li>{`${moment(props.item.outbDtm, 'YYYYMMDDHHmmss').format("MM-DD HH:mm:ss")}`}</li>
            <li>
                <div className={"detail_more_btn"} onClick={(e) => handleDetailBtn(e)}/>
            </li>
            <div className={`event_detail_frame`} id={"event_frame1"}>
                <ul className={`event_detail ${props.item.eventCd === 'SWE' ? 'wide' : ''}`}>
                    <li><span className={'eventContent'}>{`${setCntnForm()}`}</span></li>
                </ul>
            </div>
        </ul>
    )

}
export default LeftMenuEventList