import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import TypeSelectItem from "./typeSelectItem";
import {useShallow} from "zustand/react/shallow";

const TypeSelect = () => {


    const {eventTypeList} = useEventStore(useShallow((state)=> ({
        eventTypeList : state.eventTypeList
    })))
    return (
        <div className={"options_select_body"}>
            <div className={"total_check_event"}>
                <TypeSelectItem item={{codeNm : '전체', codeCd:'all'}}/>
            </div>
            <div className={"each_check_event"}>
                {
                    eventTypeList.length > 0 &&
                    eventTypeList.map((event) => (
                        <TypeSelectItem item={event}/>
                    ))
                }
            </div>
        </div>
    )

}

export default TypeSelect