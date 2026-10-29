import {EventItemType} from "../../../conf/interface/event/eventInterface.ts";
import {useLastEventStore} from "../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";

const LastEventModalDetail = () => {

    const {activeItem} = useLastEventStore(useShallow((state)=> ({
        activeItem : state.activeItem
    })))

    const setCntnForm = (activeEvent : EventItemType) => {
        let result = activeEvent.cntn;
        if (activeEvent.eventCd === 'SWE'){
            let cntnSplit =  activeEvent.cntn.split(',');

            let newCntn = cntnSplit.join('\n');

            result = newCntn

        }

        return result;
    }

    return (
        <div className={"last_event_detail"}>
            <header className={"last_event_detail_header"}>이벤트 상세 내용</header>
            <div className={"last_event_detail_frame"}>
                {
                    activeItem ?
                        <div className={"last_event_detail_info"}>{activeItem ?  setCntnForm(activeItem) : ''}</div>
                        :
                        <div className={"last_event_detail_info none"}>선택된 이벤트가 없습니다.</div>
                }
            </div>
        </div>
    )

}

export default LastEventModalDetail