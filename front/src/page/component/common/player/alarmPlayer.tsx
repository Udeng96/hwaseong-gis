import {MutableRefObject, useEffect, useRef, useState} from "react";
import alarm from "../../../../assets/alarm/new_alarm.wav";
import {useEventStore} from "../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";


const AlarmPlayer = () => {

    const [alarmUrl, setAlarmUrl] = useState<any>(null);
    const alarmRef: MutableRefObject<any> = useRef();

    const {isSWEReceive, setIsSWEReceive} = useEventStore(useShallow((state) => ({
        isSWEReceive: state.isSWEReceive,
        setIsSWEReceive: state.actions.setIsSWEReceive
    })))
    const handlerFetchAlarm = async () => {
        try {
            const response = await fetch(alarm);

            if (!response.ok) {
                console.log("Network Response was not Ok");
            }

            const arrayBuffer = await response.arrayBuffer();

            const alarmBlob = new Blob([arrayBuffer], {type: 'audio/mpeg'});
            const alarmUrl = URL.createObjectURL(alarmBlob);

            setAlarmUrl(alarmUrl);

        } catch (e) {
            console.error("Error fetching the alarm", e);
        }
    }

    useEffect(() => {
        if (!alarmRef.current) {
            handlerFetchAlarm();
        }
    }, [alarmRef.current]);

    useEffect(() => {
        console.log("isSWEReceive", isSWEReceive)

        if (isSWEReceive === true) {
            if (alarmRef.current) {
                {
                    alarmRef.current.play();
                    alarmRef.current.loop = false;
                }
            }
        }

    }, [isSWEReceive]);

    const onEndAlarm = () => {
        setIsSWEReceive(false);
    }


    return (
        <>
            <div>
                {alarmUrl &&
                    <audio autoPlay={false} controls={false} src={alarmUrl} ref={alarmRef} onEnded={onEndAlarm}/>}
            </div>
        </>
    )

}

export default AlarmPlayer