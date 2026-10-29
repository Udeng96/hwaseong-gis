import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {Popup} from "react-leaflet";
import CctvListPopupItem from "./cctvListPopupItem";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {LatLngTuple} from "leaflet";

const CctvListPopup = () => {

    const {activeCctvCluster, activeCctvClusterList, setActiveCctvCluster, setActiveCctvClusterList} = useGisStore(useShallow((state)=>({
        activeCctvCluster : state.activeCctvCluster,
        activeCctvClusterList : state.activeCctvClusterList,
        setActiveCctvCluster : state.actions.setActiveCctvCluster,
        setActiveCctvClusterList : state.actions.setActiveCctvClusterList
    })))

    const setActiveCctv = useCctvStore.getState().actions.setActiveCctv

    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);


    useEffect(()=>{
        if(activeCctvClusterList.length!==0){
            setPopupIsOpen(true);
        }else{
            setPopupIsOpen(false);
        }
    },[activeCctvClusterList])

    const handleClsBtn = () => {
        setActiveCctvCluster([0,0]);
        setActiveCctvClusterList([] );
        setActiveCctv(null);
        setPopupIsOpen(false);
    }

    return(
        <>
            {
                popupIsOpen &&
                activeCctvClusterList.length > 0&&
                <Popup
                    position={activeCctvCluster}
                    autoPan={false}
                    autoClose={false}
                    closeButton={false}
                    closeOnClick={false}
                    keepInView={true}
                    closeOnEscapeKey={false}
                >
                    <div className={"cctvClustering_list_frame"} style={{display:`${popupIsOpen? 'block':'none'}`}} onClick={e=>e.stopPropagation()}>
                        <div className={"cctvClustering_list_header"}>
                            <div className={"cctvClustering_header_icon"}/>
                            <div className={"cctvClustering_header_title"}>CCTV 선택</div>
                            <button className={"cctvClustering_close_btn"} onClick={()=>{handleClsBtn()}}/>
                        </div>
                        <div className={"cctvClustering_list_body"}>
                            <div className={"scroll cctv_cluster"}>
                                {
                                    activeCctvClusterList.map((item)=>(
                                        <CctvListPopupItem cctv={item} setPopupIsOpen={setPopupIsOpen}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Popup>
            }
        </>
    )


}

export default CctvListPopup