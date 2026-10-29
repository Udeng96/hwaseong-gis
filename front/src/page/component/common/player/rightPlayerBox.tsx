import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";
import PlayerBody from "./playerBody";

const RightPlayerBox = (props:{cctv : CctvItemType | null, isSmall : boolean, index : number}) => {

    return (
        <div className={`cctv_player_box ${props.isSmall ? 'small' : ''}`}>
            <header className={"cctv_player_header"}>
                <div className={"cctv_player_num"}>{props.index + 1}</div>
                <div className={"cctv_player_title"}>{props.cctv ? props.cctv.cctvNm : '영상없음'}</div>
            </header>
            <PlayerBody cctv={props.cctv} isSmall={props.isSmall}/>
        </div>
    )

}

export default RightPlayerBox