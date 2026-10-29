import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import EventListPopupItem from "./eventListPopupItem";
import {Popup} from "react-leaflet";
import {LatLng, LatLngTuple} from "leaflet";

const EventListPopup = () => {

    const {
        activeFunc,
        activeEventCluster,
        activeEventClusterList,
        setActiveEventCluster,
        setActiveEventClusterList
    } = useGisStore(useShallow((state) => ({
        activeFunc : state.activeFunc,
        activeEventCluster: state.activeEventCluster,
        activeEventClusterList: state.activeEventClusterList,
        setActiveEventCluster: state.actions.setActiveEventCluster,
        setActiveEventClusterList: state.actions.setActiveEventClusterList
    })))

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    useEffect(() => {
        if (activeEventClusterList.length !== 0) {
            setIsPopupOpen(true);
        } else {
            setIsPopupOpen(false);
        }
    }, [activeEventClusterList])

    const handleClsBtn = () => {
        setActiveEventCluster([0,0]);
        setActiveEventClusterList([]);
    }

    return (
        isPopupOpen &&
        activeEventClusterList.length !== 0 &&
        <Popup
            position={activeEventCluster}
            autoPan={false}
            autoClose={false}
            closeButton={false}
            closeOnClick={false}
            keepInView={true}
            closeOnEscapeKey={false}>
            <div className={"cctvClustering_list_frame"} style={{display: `${isPopupOpen ? 'block' : 'none'}`}}
                 onClick={e => e.stopPropagation()}>
                <div className={"cctvClustering_list_header"}>
                    <div className={"cctvClustering_header_icon"}/>
                    <div className={"cctvClustering_header_title"}>CCTV 선택</div>
                    <button className={"cctvClustering_close_btn"} onClick={() => {
                        handleClsBtn()
                    }}/>
                </div>
                <div className={"cctvClustering_list_body"}>
                    <div className={"scroll cctv_cluster"}>
                        {
                            activeEventClusterList.map((item) => (
                                <EventListPopupItem eventCctv={item}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Popup>
    )

}

export default EventListPopup