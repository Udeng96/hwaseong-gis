import {EventItemType} from "../../../../conf/interface/event/eventInterface.ts";
import moment from "moment/moment";
import {useLastEventStore} from "../../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";

const LastEventModalListItem = (props:{event:EventItemType}) => {

    
    const {activeItem, setActiveItem} = useLastEventStore(useShallow((state)=> ({
        activeItem : state.activeItem,
        setActiveItem : state.actions.setActiveItem
    })))

    const handleItem = () => {
        if(activeItem){
            if(activeItem.seqn === props.event.seqn){
                setActiveItem(null);
            }else{
                setActiveItem(props.event);
            }
        }else{
            setActiveItem(props.event)
        }
    }

    return (
        <ul className={`last_event_list_body ${activeItem&& (activeItem.seqn === props.event.seqn) ? 'active' : ''}`} onClick={handleItem}>
            <li>{`${props.event.eventNm}`}</li>
            <li>{`${props.event.addr}`}</li>
            <li>{`${moment(props.event.outbDtm,'YYYYMMDDHHmmssSSS').format('MM-DD HH:mm:ss')}`}</li>
        </ul>

    )


}

export default LastEventModalListItem