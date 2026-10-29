import {useStatStore} from "../../../../../../data/store/zustand/statStore";
import {STAT_TYPE} from "../../../../../../conf/const/stat/statConst";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {TodayStatType} from "../../../../../../conf/interface/stat/statInterface";
import TimeStat from "./time/timeStat";
import EventNone from "./event/eventNone";
import EventLoad from "./event/eventLoad";
import EventList from "./event/eventList";

const RightToday = () => {

    const {activeType, todayStatList, setIsExcelRequest} = useStatStore(useShallow((state)=> ({
        activeType : state.activeType,
        todayStatList : state.todayStatList,
        setIsExcelRequest : state.actions.setIsExcelRequest
    })))

    const [todayStatItem,setTodayStatItem] = useState<TodayStatType| null>(null);
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(()=>{
        if(activeType.includes(STAT_TYPE.TODAY+"_")){
            setIsShow(true);
        }else{
            setIsShow(false);
        }

        if(todayStatList.length > 0){
            const eventTypeStat = todayStatList.filter((stat)=> activeType.includes(stat.eventCd));
            if(eventTypeStat.length > 0){
                setTodayStatItem(eventTypeStat[0]);
            }else{
                setTodayStatItem(null);
            }
        }
    },[activeType, todayStatList])

    return(
        <>
            <TimeStat isShow={isShow}/>
            <div className={`table ${isShow ? '' :'none'}`}>
                <div className="table__head">
                    <h3 className="table__title">총 <span>{todayStatList.length > 0 && todayStatList.filter((stat)=> activeType.includes(stat.eventCd))[0].totalCnt.toLocaleString() }</span>건</h3>
                    <button type="button" className="btn-normal btn-download" onClick={()=> setIsExcelRequest(activeType)}>엑셀 다운로드</button>
                </div>
                <EventNone isShow={isShow && todayStatItem && todayStatItem.totalCnt === 0}/>
                <EventLoad isShow={false}/>
                <EventList isShow={isShow && todayStatItem && todayStatItem.totalCnt > 0} eventList={todayStatItem && todayStatItem.eventList}/>
            </div>
        </>
    )
}

export default RightToday