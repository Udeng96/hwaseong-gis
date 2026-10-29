import {useEffect, useState} from "react";
import {EventItemType} from "../../../conf/interface/event/eventInterface";
import {EVENT_RESULT_TYPE} from "../../../conf/const/event/eventConst";
import LastEventModalListItem from "./result/lastEventModalListItem";
import LastEventModalPage from "./lastEventModalPage";
import {useLastEventStore} from "../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";
import LastEventModalError from "./result/lastEventModalError";
import LastEventModalEmpty from "./result/lastEventModalEmpty";

const LastEventModalListArea = () => {

    const {lastSearchEventType, lastEventList, activePage} = useLastEventStore(useShallow((state)=>({
        lastSearchEventType : state.lastSearchEventType,
        lastEventList : state.lastEventList,
        activePage : state.activePage,
    })));


    const [eventList, setEventList] = useState<EventItemType[]>([]);

    useEffect(() => {

        if(lastEventList.length > 0){
            setEventList(lastEventList.filter((_, index)=>(index >= (activePage-1)*10 && index < (activePage-1)*10+10)));
        }else{
            setEventList([]);
        }


    }, [lastEventList,activePage]);

    return (
        <div className={"last_event_list"}>
            <ul className={"last_event_list_header"}>
                <li>이벤트</li>
                <li>위치</li>
                <li>발생 일시</li>
            </ul>
            <div className={`last_event_item_frame ${ lastSearchEventType === EVENT_RESULT_TYPE.error ? 'error' : lastEventList.length === 0 ? 'none' : ''}`}>
                {
                    lastSearchEventType === EVENT_RESULT_TYPE.success&&
                    lastEventList.length === 0 ?
                        <LastEventModalEmpty/>
                        :
                        eventList.map((last)=>(
                            <LastEventModalListItem event={last}/>
                        ))
                }
                {
                    lastSearchEventType === EVENT_RESULT_TYPE.error &&
                    <LastEventModalError/>
                }
            </div>

            <LastEventModalPage/>
        </div>
    )

}

export default LastEventModalListArea