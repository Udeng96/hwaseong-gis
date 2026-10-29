import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";
import Player from "./player";
import {useGisStore} from "../../../data/store/zustand/gisStore";

const PlayerBody = (props:{cctv : CctvItemType | null , isSmall:boolean}) => {

    const setActiveFull = useGisStore.getState().actions.setActiveFull;

    return (
        <div className={`cctv_player_body ${props.isSmall ? 'small' : ''}`}>
            {
                props.cctv ?
                    <>
                        <div className={"cctv_in"}>
                            <Player cctv={props.cctv} key={props.cctv.cctvId} cctvId={props.cctv.cctvId}/>
                        </div>
                        <button className={"cctv_player_full_btn"} onClick={()=>setActiveFull(props.cctv)}/>
                    </>
                    :
                    <div className={"cctv_error_area"}>
                        <div className={"cctv_error_content"}>표출가능 영상이 없습니다.</div>
                        {
                            !props.isSmall && <div className={"cctv_error_icon"}/>
                        }
                    </div>

            }
        </div>
    )

}

export default PlayerBody