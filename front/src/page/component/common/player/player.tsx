import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";
import {useEffect, useState} from "react";
// @ts-ignore
import XeusGate from "../../../../assets/xeus.player.2.1.0";
import {STREAM_URL_CRIME, STREAM_URL_TRAFFIC} from "../../../conf/config/config";
import {useCctvStore} from "../../../data/store/zustand/cctvStore";


const Player = (props:{cctv : CctvItemType, cctvId:string}) => {

    const playerId ='Video_Player_' + props.cctvId;
    const cctvReloadCnt = useCctvStore((state)=> state.cctvReloadCnt)
    const [player, setPlayer]= useState<any>(null);


    useEffect(() => {
        return() => {
            if (player){
                //@ts-ignore
                player.destroy()
            }
        }
    }, [player]);

    useEffect(() => {

        if (playerId){
            makePlayerAndStart();
        }else{
            setPlayer(null);
        }

    }, [props.cctvId,cctvReloadCnt]);

    const makePlayerAndStart = () => {
        // @ts-ignore
        if (player && player.destroy) {// 재생중이 영상이 있으면
            // @ts-ignore
            player.destroy();
        }


        let xeusPlayer = new XeusGate.Player({
            playerId: playerId,
            cctvMgrNo: props.cctv.mgtNo,
            timestamp: '',
            debug: false,
            url: props.cctv.cctvClfy.includes('방범') ? STREAM_URL_CRIME : STREAM_URL_TRAFFIC,
            userId: 'tester1',
            speed: '',
            codec: 'h264',
        });
        setPlayer(xeusPlayer);
    }

    return(
        <div id={playerId} style={{width:'100%', height:'100%', position:'absolute'}}></div>
    )

}

export default Player