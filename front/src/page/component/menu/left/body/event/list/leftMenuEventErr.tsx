import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {EVENT_RESULT_TYPE} from "../../../../../../conf/const/event/eventConst";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LeftMenuEventErr = () => {

    const setEventSearchType = useLastEventStore.getState().actions.setLastSearchEventType;

    return(
        <div className={"error_content"}>
            <div className={"event_reload_btn"} onClick={()=> setEventSearchType(EVENT_RESULT_TYPE.request)}/>
            <div className={"error_event_content"}>이벤트 로드에 문제가 발생하였습니다. <br/> Reload 또는 재검색을 시도해주세요</div>
        </div>
    )
}

export default LeftMenuEventErr