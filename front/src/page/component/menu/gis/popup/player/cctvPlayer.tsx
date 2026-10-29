import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {useShallow} from "zustand/react/shallow";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import Player from "../../../../common/player/player";
import {Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";

const CctvPlayer = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const activeCctv = useCctvStore((state)=> state.activeCctv)
    const setActiveCctv = useCctvStore.getState().actions.setActiveCctv;

    const {setActiveCctvCluster, setActiveFull} = useGisStore(useShallow((state)=> ({
        setActiveCctvCluster : state.actions.setActiveCctvCluster,
        setActiveFull : state.actions.setActiveFull
    })))

    const handleClsBtn = () => {
        setActiveCctv(null);
        setActiveCctvCluster([0,0]);
    }

    const handleFullPlayer = () => {
        setActiveFull(activeCctv);
    }

    return(
        <>
            {
                activeCctv &&
                activeLeftMenu === LEFT_TAB_MENU[1].cd &&
                <Popup closeButton={false} autoClose={false}
                       position={[Number(activeCctv.cctvLat),Number(activeCctv.cctvLon)]}
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
                            <h2 className={"cctv_popup_player_title"}>{activeCctv.cctvNm}</h2>
                            <button className={"cctv_popup_cancel_btn"} onClick={handleClsBtn}/>
                        </header>
                        <div className={"cctv_popup_player_body"}>
                            <div className={"cctv_in"}>
                                <Player cctv={activeCctv} cctvId={'POP_'+activeCctv.cctvId}/>
                            </div>
                            <div className={"cctv_player_btn_area"}>
                                <button className={"cctv_player_full_btn"} onClick={handleFullPlayer}/>
                            </div>

                        </div>
                    </div>
                </Popup>
            }
        </>
    )



}

export default CctvPlayer