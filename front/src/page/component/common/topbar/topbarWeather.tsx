import {fetchWeatherInfo} from "../../../data/api/common/commonApis";
import moment from "moment/moment";
import {useEffect, useState} from "react";
import {WeatherInfoType} from "../../../conf/interface/common/commonInterface";
import {WEATHER_SKY_INFO} from "../../../conf/const/common/commonConst";
import {useQuery} from "@tanstack/react-query";

const TopbarWeather = () => {

    const [weatherUpdate, setWeatherUpdate] = useState<boolean>(true);
    const [weatherInfo, setWeatherInfo] = useState<WeatherInfoType | null >(null);
    const timeoutDuration = (60 - moment().second()) * 1000;
    let timer : any = null;

    const setBaseTime = () => {
        let result = moment().format('YYYYMMDD');
        if (moment().format('HH') === '00'){
            result = moment().subtract('1','day').format('YYYYMMDD');
        }

        return result;
    }

    const {data : weatherRes} = useQuery({
        queryKey : ['weatherList'],
        queryFn : ()=>fetchWeatherInfo({baseDate : setBaseTime()}),
        enabled :weatherUpdate,
    })

    useEffect(() => {
        if(weatherRes){
            setWeatherInfo(weatherRes.data);
        }else{
            setWeatherInfo(null);
        }

        setWeatherUpdate(false);
    },[weatherRes])


    useEffect(() => {
        timer = setInterval(()=>{

            const currentTime = moment();
            //현재 분
            const currentMinute = currentTime.minute();
            const currentSecond = currentTime.second();

            //10분마다
            if (currentMinute % 10 === 0 && currentSecond === 0){
                setWeatherUpdate(true);
            }
        },1000);

        return () => {
            clearInterval(timer);
        }

    }, [timeoutDuration]);

    const setWeatherIcon = (weatherCd : string, rainCd : string ) => {

        let skyCd = "";
        let result = "01";
        if (rainCd === '0'){
            skyCd = 'sky'+weatherCd;
        }else{
            skyCd = 'rain'+rainCd;
        }

        WEATHER_SKY_INFO.map((weather)=>{
            if (weather.sky === skyCd){
                result = weather.cd;
            }
        })

        return result;

    }

    const setWeatherNm = (weatherCd : string, rainCd : string ) => {

        let skyCd = "";
        let result = "맑음";
        if (rainCd === '0'){
            skyCd = 'sky'+weatherCd;
        }else{
            skyCd = 'rain'+rainCd;
        }

        WEATHER_SKY_INFO.map((weather)=>{
            if (weather.sky === skyCd){
                result = weather.nm;
            }
        })

        return result;

    }


    return (
        <div className={"subInfo_swiper"}>
            <div className={"weather_info"}>
                <div className={"weather"}>
                    <div
                        className={`weather_img weather_${weatherInfo ? setWeatherIcon(weatherInfo.skyCd, weatherInfo.skyRainCd) : '01'}`}/>
                    <span
                        className={"weather_state"}>{weatherInfo ? setWeatherNm(weatherInfo.skyCd, weatherInfo.skyRainCd) : '맑음'}</span>
                    <span
                        className={"weather_temp"}>{weatherInfo ? weatherInfo.tempCd : '0'}<span
                        className={"degree"}>°C</span></span>
                </div>
                <div className={"humi"}>
                    <p className={"humi_title"}><span>&middot;</span>습도</p>
                    <p className={"humi_content"}>{weatherInfo ? weatherInfo.humiCd : '0'}%</p>
                </div>
                <div className={"wind"}>
                    <p className={"wind_title"}><span>&middot;</span>바람</p>
                    <p className={"wind_content"}>{weatherInfo ? weatherInfo.windCd : '0'}m/s</p>
                </div>

                {/*<button className={"next_btn"}/>*/}
            </div>
        </div>
    )

}
export default TopbarWeather