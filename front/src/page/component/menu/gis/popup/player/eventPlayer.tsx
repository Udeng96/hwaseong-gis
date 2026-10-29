import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import {Popup} from "react-leaflet";
import Player from "../../../../common/player/player";
import {LatLngTuple} from "leaflet";

const EventPlayer = () => {
    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const {activeEventCctv, setActiveFull, setActiveEventCctv, setActiveEventCluster} = useGisStore(useShallow((state)=> ({
        activeEventCctv : state.activeEventCctv,
        setActiveFull : state.actions.setActiveFull,
        setActiveEventCctv : state.actions.setActiveEventCctv,
        setActiveEventCluster : state.actions.setActiveEventCluster
    })))

    const handleClsBtn = () => {
        setActiveEventCctv(null);
        setActiveEventCluster([0,0]);
    }

    const handleFullBtn = () => {
        setActiveFull(activeEventCctv);
    }

    return(
        activeEventCctv &&
        activeLeftMenu === LEFT_TAB_MENU[0].cd &&
        <Popup
            closeButton={false}
            autoClose={false}
            position={[Number(activeEventCctv.cctvLat),Number(activeEventCctv.cctvLon)]}
            autoPan={false}
            closeOnClick={false}
            offset={[100, 100]}
        >
            <div
                className={`cctv_popup_player_box`}
                onClick={e => e.stopPropagation()}
            >
                <header className={"cctv_popup_player_header"}>
                    <div className={"cctv_popup_player_icon"}/>
                    <h2 className={"cctv_popup_player_title"}>{activeEventCctv.cctvNm}</h2>
                    <button className={"cctv_popup_cancel_btn"} onClick={handleClsBtn}/>
                </header>
                <div className={"cctv_popup_player_body"}>
                    <div className={"cctv_in"}>
                        <Player cctv={activeEventCctv} cctvId={'POP_EVENT_'+activeEventCctv.cctvId}/>
                    </div>
                    <div className={"cctv_player_btn_area"}>
                        <button className={"cctv_player_full_btn"} onClick={handleFullBtn}/>
                    </div>
                </div>
            </div>
        </Popup>
    )


}

export default EventPlayer