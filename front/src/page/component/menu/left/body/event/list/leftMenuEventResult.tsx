import {EVENT_RESULT_TYPE} from "../../../../../../conf/const/event/eventConst";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import LeftMenuEventErr from "./leftMenuEventErr";
import LeftMenuEventEmpty from "./leftMenuEventEmpty";
import LeftMenuEventList from "./leftMenuEventList";

const LeftMenuEventResult = () => {

    const {eventList, eventSearchType} = useEventStore(useShallow((state)=> ({
        eventList : state.eventList,
        eventSearchType : state.eventSearchType
    })))

    return (
        <div className={`event_list_item_frame ${eventSearchType === EVENT_RESULT_TYPE.error ? 'error' : eventList.length === 0 ? 'none' : ''}`}>
            {
                eventSearchType === EVENT_RESULT_TYPE.error &&
                <LeftMenuEventErr/>
            }
            {
                eventSearchType === EVENT_RESULT_TYPE.success &&
                <>
                    {
                        eventList.length > 0 &&
                        eventList.map((event)=>(
                            !event.cntn.includes("테스트") &&
                            <LeftMenuEventList item={event}/>
                        ))
                    }
                    {
                        eventList.length === 0 &&
                        <LeftMenuEventEmpty/>
                    }
                </>
            }
        </div>
    )
}

export default LeftMenuEventResult;