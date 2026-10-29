import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import TopbarWeather from "./topbarWeather";
import TopbarReport from "./topbarReport";
import {OMS, OMS_CONTEXT} from "../../../conf/config/config";
import TopbarSysSelect from "./topbarSysSelect";
import TopbarProfile from "./topbarProfile";

const Topbar = () => {

    const [nowDate, setNowDate] = useState<string>(moment().locale('ko').format("YYYY년 MM월 DD일"));
    const [nowTime, setNowTime] = useState<string>(moment().format("HH:mm"));
    const timeoutDuration = (60 - moment().second()) * 1000;

    let timer: any = null;

    useEffect(() => {

        timer = setInterval(() => {
            setNowDate(moment().locale('ko').format("YYYY년 MM월 DD일"));
            setNowTime(moment().format("HH:mm"));
        }, 1000);

        return () => {
            clearInterval(timer);
        }

    }, [timeoutDuration]);

    const handleLogoBtn = () => {
        window.location.href = OMS + OMS_CONTEXT.OMS_VIEW;
    }

    return (
        <section className="top_bar">
            <div className="logo_img" onClick={handleLogoBtn}/>
            <div className={"sub_info"}>
                <div className={"date_info"}>{`${nowDate} ${nowTime}`}</div>
                <TopbarWeather/>
                <TopbarReport/>
            </div>
            <div className={"vertical-line"}/>
            <TopbarSysSelect/>
            <TopbarProfile/>
        </section>
    )
}

export default Topbar