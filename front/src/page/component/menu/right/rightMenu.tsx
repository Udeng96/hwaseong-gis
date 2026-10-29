import RightPlayerBox from "../../common/player/rightPlayerBox";
import {useEffect, useState} from "react";
import {GIS_FUNC} from "../../../conf/const/common/gisConst";
import {useGisStore} from "../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCctvStore} from "../../../data/store/zustand/cctvStore";
import {LEFT_TAB_MENU} from "../../../conf/const/common/commonConst";
import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {useEventStore} from "../../../data/store/zustand/eventStore";

const RightMenu = () => {


    const setCctvReloadCnt = useCctvStore.getState().actions.setCctvReloadCnt;
    const acitveLeftMenu = useCommonStore((state)=> state.activeLeftMenu)
    const {activeFunc, activeCastCctvList, activeEventCastCctvList} = useGisStore(useShallow((state) => ({
        activeFunc: state.activeFunc,
        activeCastCctvList: state.activeCastCctvList,
        activeEventCastCctvList: state.activeEventCastCctvList,
    })))

    const activeEvent = useEventStore((state)=> state.activeEvent)

    const [panelOpen, setPanelOpen] = useState<boolean>(true);

    const handleReloadBtn = () => {
        setCctvReloadCnt()
    }

    return (
        <section className={`cctv_viewer_container ${panelOpen ? '' : 'close'}`}>
            <button type="button" className={"tab_btn cctv"} onClick={() => {
                setPanelOpen(!panelOpen)
            }}/>
            <header className="cctv_header">
                <div className={"cctv_func"}>
                    <h1 className="cctv_title">선택 위치 주변<span>CCTV</span></h1>
                    <div className="func_btn_area">
                        <button type="button" className="btn_reload" onClick={handleReloadBtn}>Reload</button>
                    </div>
                </div>
                <div className={`cctv_loc_text ${activeEvent ? '' : 'none'}`}>
                    {activeEvent ? activeEvent.addr : '선택된 이벤트가 없습니다.'}
                </div>
            </header>
            <div className={"cctv_body"}>
                {
                    (activeFunc !== GIS_FUNC.CASTNET &&
                        acitveLeftMenu === LEFT_TAB_MENU[0].cd) ?
                        activeEventCastCctvList.length > 0 ?
                            activeEventCastCctvList.map((event, index) => (
                                <RightPlayerBox cctv={event} isSmall={(!(index === 0 || index === 1))} index={index}/>
                            ))
                            :
                            <>
                                <RightPlayerBox cctv={null} isSmall={false} index={0}/>
                                <RightPlayerBox cctv={null} isSmall={false} index={1}/>
                                <RightPlayerBox cctv={null} isSmall={true} index={2}/>
                                <RightPlayerBox cctv={null} isSmall={true} index={3}/>
                                <RightPlayerBox cctv={null} isSmall={true} index={4}/>
                                <RightPlayerBox cctv={null} isSmall={true} index={5}/>
                            </>
                        :
                        ''
                }
                {
                    activeFunc === GIS_FUNC.CASTNET &&
                    activeCastCctvList.length > 0 ?
                        activeCastCctvList.map((gis, index) => (
                            <RightPlayerBox cctv={gis} isSmall={(!(index === 0 || index === 1))} index={index}/>
                        ))
                        :
                        <>
                            <RightPlayerBox cctv={null} isSmall={false} index={0}/>
                            <RightPlayerBox cctv={null} isSmall={false} index={1}/>
                            <RightPlayerBox cctv={null} isSmall={true} index={2}/>
                            <RightPlayerBox cctv={null} isSmall={true} index={3}/>
                            <RightPlayerBox cctv={null} isSmall={true} index={4}/>
                            <RightPlayerBox cctv={null} isSmall={true} index={5}/>
                        </>
                }

            </div>
        </section>
    )

}

export default RightMenu