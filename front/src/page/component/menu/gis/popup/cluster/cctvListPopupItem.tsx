import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import React, {useRef, useState} from "react";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";

const CctvListPopupItem = (props: { cctv: CctvItemType, setPopupIsOpen :  (value: (((prevState: boolean) => boolean) | boolean)) => void}) => {

    const setActiveCctv = useCctvStore.getState().actions.setActiveCctv;
    const clusterNmRef: React.MutableRefObject<any> = useRef(null);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const handlePlayBtn = () => {
        setActiveCctv(props.cctv);
        props.setPopupIsOpen(false);

    }

    return (
        <div className={"cctvClustering_list_item"}>
            <span className={`cctv_list_icon ${props.cctv.cctvClfy.includes('방범') ? 'safeGuard' : 'traffic'}`}/>
            <span className={"cctvClustering_item_title"}
                  ref={clusterNmRef}
                  onMouseOver={() => {
                      const isOver = clusterNmRef.current.scrollWidth > clusterNmRef.current.clientWidth;
                      setShowTooltip(isOver)
                  }}
                  onMouseLeave={() => {
                      setShowTooltip(false)
                  }}
            >{props.cctv.cctvNm}
                </span>
            <button className={"cctvClustering_item_play_btn"} onClick={handlePlayBtn}/>
            {
                showTooltip && <div className={"tooltip clustering"}>{props.cctv.cctvNm}</div>
            }

        </div>
    )

}

export default CctvListPopupItem