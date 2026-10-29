import {useEffect, useState} from "react";
import {useStatStore} from "../../../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const TimeChart = () => {

    const {activeType, todayStatList} = useStatStore(useShallow((state)=> ({
        activeType : state.activeType,
        todayStatList : state.todayStatList
    })));
    const [series, setSeires] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [tick, setTick] = useState<number[]>([]);


    useEffect(() => {

        if(todayStatList.length > 0){
            const activeEventType = activeType.split("_")[1];
            const filterTodayStat = todayStatList.filter((item)=> item.eventCd === activeEventType);
            if(filterTodayStat.length > 0){
                const newSeries = filterTodayStat[0].timeStat.map((item)=> item.count);
                const maxValue = Math.max(...newSeries)
                const timeStatList = filterTodayStat[0].timeStat;
                setSeires(timeStatList.map((item)=> item.count));
                setCategories(timeStatList.map((item)=> item.type+"시"))
                if(maxValue >10){
                    setTick(getTickSettingsFixed6(maxValue).tickPositions)
                }else{
                    setTick([0,2,4,6,8,10]);
                }
            }else{
                setSeires([]);
                setCategories([]);
            }
        }
    }, [activeType, todayStatList])

    function getTickSettingsFixed6(maxDataValue) {
        const tickAmount = 6; // 고정

        if (maxDataValue <= 0) {
            return {
                tickAmount,
                max: 10,
                tickInterval: 2,
                tickPositions: [0, 2, 4, 6, 8, 10],
            };
        }

        // tick 간격 계산
        const rawInterval = maxDataValue / (tickAmount - 1);

        // 보기 좋은 간격으로 올림
        const interval = niceRound(rawInterval);

        // 최대값 보정
        const roundedMax = interval * (tickAmount - 1);

        // tick 위치 배열 생성
        const tickPositions = Array.from({ length: tickAmount }, (_, i) => i * interval);

        return {
            tickAmount,
            max: roundedMax,
            tickInterval: interval,
            tickPositions,
        };
    }

// 보기 좋은 숫자로 반올림 함수
    function niceRound(num) {
        const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
        const residual = num / magnitude;
        if (residual <= 1) return 1 * magnitude;
        if (residual <= 2) return 2 * magnitude;
        if (residual <= 5) return 5 * magnitude;
        return 10 * magnitude;
    }

    const options = {
        chart: {
            spacing: 0,
            marginTop: 5,
            backgroundColor: 'transparent',
            height: 266
        },

        title: {
            text: '',
        },

        tooltip: {
            enabled: false
        },

        xAxis: {
            labels: {
                style: {
                    color: '#DBE5E5',
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    letterSpacing: '-0.72px'
                },
            },
            lineColor: 'transparent',
            categories: categories
        },

        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: '#DBE5E5',
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    letterSpacing: '-0.72px'
                },
            },
            gridLineWidth: 1,
            gridLineColor: '#40415A',
            tickPositions: tick
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                lineColor:'#578CFF',
                marker: {
                    symbol: 'circle',
                    radius: 4,
                    enabled: true,
                    fillColor: '#578CFF',
                    lineColor: 'rgba(87, 140, 255, 0.50)',
                    lineWidth: 4,
                    states: {
                        hover: {
                            enabled: false
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    inside: false,
                    align: 'center',
                    verticalAlign: 'top',
                    y: -34,
                    borderRadius: 3,
                    style: {
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: 'Pretendard',
                        letterSpacing: '-0.72px'
                    },
                }
            }
        },

        series: [{
            name: "이벤트 발생 현황",
            data: series

        }],

        credits: {
            enabled: false
        },
    }

    return (
        <div className={'connectChart'}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}/>
        </div>
    )


}

export default TimeChart