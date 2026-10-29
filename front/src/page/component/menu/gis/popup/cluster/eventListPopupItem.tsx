import React, {useEffect, useRef, useState} from "react";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";

const EventListPopupItem = (props: {eventCctv : CctvItemType}) => {
    const clusterNmRef: React.MutableRefObject<any> = useRef(null);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    const {activeFunc,activeEventCctv, activeEventCastCctvList, setActiveEventCctv, setActiveEventClusterList} = useGisStore(useShallow((state)=> ({
        activeFunc : state.activeFunc,
        activeEventCctv : state.activeEventCctv,
        activeEventCastCctvList : state.activeEventCastCctvList,
        setActiveEventCctv: state.actions.setActiveEventCctv,
        setActiveEventClusterList : state.actions.setActiveEventClusterList,
    })));

    useEffect(() => {
        if(activeFunc)
        if(activeEventCctv){
            if(activeEventCastCctvList.length > 0){
                let newPlayEventCctvIdList : string[] = activeEventCastCctvList.map((item)=> item.cctvId);

                if(activeEventCastCctvList.filter((item)=> item.cctvId === activeEventCctv.cctvId).length > 0){
                }else{
                    newPlayEventCctvIdList = [...newPlayEventCctvIdList, activeEventCctv.cctvId];
                }

                if(newPlayEventCctvIdList.includes(props.eventCctv.cctvId)){
                    setIsActive(true);
                }else{
                    setIsActive(false);
                }
            }else{
                if(activeEventCctv.cctvId === props.eventCctv.cctvId){
                    setIsActive(true);
                }else{
                    setIsActive(false);
                }
            }
        }else{
            if(activeEventCastCctvList.length > 0){
                activeEventCastCctvList.map((item)=>{
                    if (item.cctvId === props.eventCctv.cctvId){
                        setIsActive(true);
                    }
                })
            }
        }
    }, [activeEventCastCctvList, activeEventCctv]);


    const handlePlayBtn = () => {
        setActiveEventCctv(props.eventCctv);
        setActiveEventClusterList([]);

    }

    return (
        <div className={`cctvClustering_list_item ${isActive ? 'active' : ''}`}>
            <span className={`cctv_list_icon general`}/>
            <span className={"cctvClustering_item_title"}
                  ref={clusterNmRef}
                  onMouseOver={() => {
                      const isOver = clusterNmRef.current.scrollWidth > clusterNmRef.current.clientWidth;
                      setShowTooltip(isOver)
                  }}
                  onMouseLeave={() => {
                      setShowTooltip(false)
                  }}
            >{props.eventCctv.cctvNm}
                </span>
            {
                isActive?
                    '':
                <button className={"cctvClustering_item_play_btn"} onClick={handlePlayBtn}/>

            }
            {
                showTooltip && <div className={"tooltip clustering"}>{props.eventCctv.cctvNm}</div>
            }

        </div>
    )

}

export default EventListPopupItem