import {useEffect, useState} from "react";
import {MAP_LAYER_TYPE} from "../../../../conf/const/common/gisConst";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEventStore} from "../../../../data/store/zustand/eventStore";

const BaseChkLayer = () => {

    const [isLayerOpen, setIsLayerOpen] = useState<boolean>(false);

    const {activeBase, setActiveBase, isClear} = useGisStore(useShallow((state)=> ({
        activeBase : state.activeBase,
        setActiveBase : state.actions.setActiveBase,
        isClear : state.isClear
    })))

    useEffect(()=>{
        if(isClear){
            setIsLayerOpen(false);
        }
    },[isClear])


    return (
        <div className={"gis_map_setting_area"}>
            <button className={`gis_map_setting_btn ${isLayerOpen ? 'active' : ''}`}
                    onClick={() => setIsLayerOpen(!isLayerOpen)}>지도 설정
            </button>
            <div className={"gis_map_setting_frame"} id={"setMap"}>
                <header className={"gis_map_setting_title"}>지도 타입 설정</header>
                <div className={"map_type_setting_area"}>
                    <button className={`map_type_btn normal ${activeBase === "NORMAL" ? 'active' : ''}`}
                            onClick={() => setActiveBase("NORMAL")}>일반지도
                    </button>
                    <button
                        className={`map_type_btn satellite ${activeBase === "SATE" ? 'active' : ''}`}
                        onClick={() => setActiveBase("SATE")}>위성지도
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BaseChkLayer;