import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import LastTypeSelectItem from "./lastTypeSelectItem";
import {useShallow} from "zustand/react/shallow";

const LastTypeSelect = () => {

    const {eventTypeList} = useEventStore(useShallow((state)=> ({
        eventTypeList : state.eventTypeList
    })))
    return (
        <div className={"options_select_body"}>
            <div className={"total_check_event"}>
                <LastTypeSelectItem item={{codeNm : '전체', codeCd:'all'}}/>
            </div>
            <div className={"each_check_event"}>
                {
                    eventTypeList.length > 0 &&
                    eventTypeList.map((event) => (
                        <LastTypeSelectItem item={event}/>
                    ))
                }
            </div>
        </div>
    )

}

export default LastTypeSelect