import {useEffect, useState} from "react";
import moment from "moment";
import {fetchReportInfo} from "../../../data/api/common/commonApis";
import {useQuery} from "@tanstack/react-query";

const TopbarReport = () => {

    const [reportUpdate, setReportUpdate] = useState<boolean>(true);
    const [report, setReport] = useState<string>("");
    const timeoutDuration = (60 - moment().second()) * 1000;
    let timer : any = null;

    const setBaseTime = () => {
        let result = moment().format('YYYYMMDD');
        if (moment().format('HH') === '00'){
            result = moment().subtract('1','day').format('YYYYMMDD');
        }

        return result;
    }

    const {data: reportRes} = useQuery({
        queryKey : ['reportInfo'],
        queryFn : ()=> fetchReportInfo({baseDate : setBaseTime()}),
        enabled: reportUpdate
    })

    useEffect(()=>{
        if(reportRes){
            setReport(reportRes.data);
        }else{
            setReport(null);
        }
        setReportUpdate(false);

    },[reportRes])

    useEffect(() => {
        timer = setInterval(()=>{

            const currentTime = moment();
            //현재 분
            const currentMinute = currentTime.minute();
            const currentSecond = currentTime.second();

            //10분마다
            if (currentMinute % 10 === 0 && currentSecond === 0){
                setReportUpdate(true);
            }
        },1000);

        return () => {
            clearInterval(timer);
        }

    }, [timeoutDuration]);


    return (
        <div className={"weather_report"}>
            <span className={"report_content"}>{report === "" ? '기상 특보 없음' : report}</span>
        </div>
    )

}

export default TopbarReport