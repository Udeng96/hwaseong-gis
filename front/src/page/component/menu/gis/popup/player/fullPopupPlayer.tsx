import Player from "../../../../common/player/player";
import {useEffect} from "react";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";

const FullPopupPlayer = () => {

    const {activeFull, setActiveFull} = useGisStore(useShallow((state)=>({
        activeFull : state.activeFull,
        setActiveFull : state.actions.setActiveFull
    })))


    // esc 키를 눌렀을 때 full player 꺼지기
    useEffect(() => {
        if (!activeFull) return;

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveFull(null);
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [activeFull]);

    return (
        activeFull &&
        <div className={`cctv_popup_player_box full`}
             onClick={e => e.stopPropagation()}>
            <header className={"cctv_popup_player_header"}>
                <div className={"cctv_popup_player_icon"}/>
                <h2 className={"cctv_popup_player_title"}>{activeFull.cctvNm}</h2>
                <button className={"cctv_popup_cancel_btn"} onClick={()=>setActiveFull(null)}/>
            </header>
            <div className={"cctv_popup_player_body"}>
                <div className={"cctv_in"}>
                    <Player cctv={activeFull} cctvId={'FULL'+activeFull.cctvId}/>
                </div>
            </div>
        </div>
    )

}

export default FullPopupPlayer