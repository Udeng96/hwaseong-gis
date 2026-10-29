import RightToday from "./today/rightToday";
import RightDate from "./date/rightDate";
import {useStatStore} from "../../../../../data/store/zustand/statStore";
import {useEffect, useState} from "react";
import {STAT_EVENT_TYPE_LIST, STAT_TYPE} from "../../../../../conf/const/stat/statConst";
import RightMonth from "./month/rightMonth";

const StatBodyRight = () => {
    const activeType = useStatStore((state)=> state.activeType)

    const [title, setTitle] = useState<string>("금일");

    useEffect(()=>{
        if(activeType!==""){
            if(activeType.includes(STAT_TYPE.TODAY+"_")){
                setTitle("금일");
            }else if(activeType.includes(STAT_TYPE.MONTH+"_")){
                setTitle("월별");
            }else{
                setTitle("기간별")
            }
        }
    },[activeType])
    return(
        <div className="panel panel--right" >
            <h3 className="panel__title">{activeType !== "" ? STAT_EVENT_TYPE_LIST.filter((item)=> activeType.includes(item.cd))[0].nm : ''} {title} 현황</h3>
            <RightToday/>
            <RightMonth/>
            <RightDate/>
        </div>
    )

}

export default StatBodyRight