import {useEffect, useState} from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import {EventWebSocketType} from "../../../../../../conf/interface/event/eventInterface";
import {API_WS_URL} from "../../../../../../conf/config/config";

const WsEvent = (props:{isSocketOn : boolean}) => {

    const [readyState, setReadyState] = useState<number>(3);
    const {setWsEventData,wsEventSocket, setWsEventSocket} = useEventStore(useShallow((state)=>({
        setWsEventData : state.actions.setWsEventData,
        wsEventSocket : state.wsEventSocket,
        setWsEventSocket: state.actions.setWsEventSocket
    }) ))


    useEffect(() => {

        if(wsEventSocket){
            if(readyState !==1){
                if(wsEventSocket.readyState === wsEventSocket.CONNECTING){
                    console.log("connecting...");
                    wsEventSocket.onopen = () => {
                        console.log("open event websocket");
                        setReadyState(1);
                    }
                }
            }
        }
        if (wsEventSocket) {
            if (props.isSocketOn) {
                if (readyState !== 1) {
                    if (wsEventSocket.readyState === wsEventSocket.CONNECTING) {
                        console.log("connecting....");
                        wsEventSocket.onopen = () => {
                            console.log("open event websocket");
                            setReadyState(1);
                        }
                    }
                } else {
                    wsEventSocket.onmessage = (e) => {
                        const eventData = JSON.parse(e.data);
                        if(!eventData.hasOwnProperty("type")){
                            setWsEventData(eventData as EventWebSocketType);
                        }else{
                            setWsEventData(null);
                        }
                    }
                }
                wsEventSocket.onerror = (err) => {
                    console.log("error on event websocket, ", err);
                    wsEventSocket?.close(1000, "auto close");
                    setWsEventSocket(null);
                    setReadyState(3);
                }
            } else {
                console.info("close event websocket");
                wsEventSocket.close();
                setWsEventSocket(null);
                setReadyState(3);
            }
        } else {
            if (props.isSocketOn) {
                setWsEventSocket(new WebSocket(API_WS_URL));
            }
        }

    }, [wsEventSocket, readyState, props.isSocketOn])

}

export default WsEvent