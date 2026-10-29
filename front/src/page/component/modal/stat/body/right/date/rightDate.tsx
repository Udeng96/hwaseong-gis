import {useStatStore} from "../../../../../../data/store/zustand/statStore";
import {STAT_TYPE} from "../../../../../../conf/const/stat/statConst";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {MonthStatType} from "../../../../../../conf/interface/stat/statInterface";
import TypeStat from "./type/typeStat";
import DateStat from "./date/dateStat";
import AreaStat from "./area/areaStat";

const RightDate = () => {
    const {activeType, dateStatList} = useStatStore(useShallow((state)=> ({
        activeType : state.activeType,
        dateStatList : state.dateStatList
    })))

    const [dateStatItem,setDateStatItem] = useState<MonthStatType| null>(null);
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(()=>{
        if(activeType.includes(STAT_TYPE.DATE+"_")){
            setIsShow(true);
        }else{
            setIsShow(false);
        }

        if(dateStatList.length > 0){
            const eventTypeStat = dateStatList.filter((stat)=> activeType.includes(stat.eventCd));
            if(eventTypeStat.length > 0){
                setDateStatItem(eventTypeStat[0]);
            }else{
                setDateStatItem(null);
            }
        }
    },[activeType, dateStatList])

    return (
        <>
            <div className="loading" style={{ display: "none" }}>
                <svg className="spinner" width="60px" height="60px" viewBox="0 0 60 60">
                    <defs>
                        <linearGradient id="Gradient1">
                            <stop className="stop1" offset="0%"></stop>
                            <stop className="stop2" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <circle className="path" fill="none" stroke-width="8" stroke-linecap="round" cx="30"
                            cy="30" r="25.5"></circle>
                </svg>
            </div>

            <div className={`total ${isShow && dateStatItem? '' :'none'}`} >
                <div className="total__frame">
                    <p className="total__name total__name--calendar">총 이벤트 발생</p>
                    <p className="total__value">{dateStatItem && dateStatItem.allCnt !== 0 ? dateStatItem.allCnt : 0}<span>건</span></p>
                </div>
                <div className="total__frame">
                    <p className="total__name total__name--pie">가장 많이 발생한 유형</p>
                    <p className="total__value">{dateStatItem && dateStatItem.mostTypeCnt !== 0 ? dateStatItem.mostType : '-' }<span>({dateStatItem ? dateStatItem.mostTypeCnt : 0}건)</span></p>
                </div>
                <div className="total__frame">
                    <p className="total__name total__name--loc">가장 많이 발생한 지역</p>
                    <p className="total__value">{dateStatItem && dateStatItem.mostAreaCnt !== 0 ? dateStatItem.mostArea : '-'}<span>({dateStatItem ? dateStatItem.mostAreaCnt : 0}건)</span></p>
                </div>
            </div>

            {/* skeleton */}
            <div className="total skeleton" style={{ display: "none" }}>
                <div className="total__frame">
                    <p className="total__name total__name--calendar">총 이벤트 발생</p>
                    <p className="total__value"></p>
                </div>
                <div className="total__frame">
                    <p className="total__name total__name--pie">가장 많이 발생한 유형</p>
                    <p className="total__value"></p>
                </div>
                <div className="total__frame">
                    <p className="total__name total__name--loc">가장 많이 발생한 지역</p>
                    <p className="total__value"></p>
                </div>
            </div>

            <div className={`frame__wrap ${isShow && dateStatItem ? '' :'none'}`}>
                <TypeStat/>
                <DateStat/>
                <AreaStat/>
            </div>
        </>
    )

}

export default RightDate