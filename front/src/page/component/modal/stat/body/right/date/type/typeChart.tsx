import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {useStatStore} from "../../../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";

const TypeChart = () => {
    const {activeType, dateStatList} = useStatStore(useShallow((state) => ({
        activeType: state.activeType,
        dateStatList: state.dateStatList
    })));
    const [series, setSeires] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [max, setMax] = useState<number>(0);
    const [ticks, setTicks] = useState<number[]>([]);

    const maxVisible = 21;
    const scrollbarNeeded = categories.length > maxVisible;
    useEffect(() => {
        if(activeType.split("_")[0] === "D"){
            if (dateStatList.length > 0) {
                const activeEventType = activeType.split("_")[1];
                const filterMonthStat = dateStatList.filter((item) => item.eventCd === activeEventType);

                if (filterMonthStat.length > 0) {
                    const timeStatList = filterMonthStat[0].typeStatList;
                    let newSeries = timeStatList.map((item)=> item.count);
                    setSeires(newSeries)
                    const maxValue = Math.max(...newSeries);
                    setCategories(timeStatList.map((item) => item.type));
                    setMax(getTickSettingsFixed6(maxValue).max);
                    setTicks(getTickSettingsFixed6(maxValue).tickPositions)

                } else {
                    setSeires([]);
                    setCategories([]);
                }
            }
        }
    }, [activeType, dateStatList])

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
            type: 'column',
            spacing: 0,
            marginTop: 20,
            marginBottom: 30,
            marginLeft: 40,
            backgroundColor: 'transparent',
            height: 300,

        },

        title: {text: ''},
        tooltip: {enabled: false},

        xAxis: {
            labels: {
                rotation: 0,
                useHTML: true,
                style: {
                    color: '#DBE5E5',
                    fontSize: '12px',
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    letterSpacing: '-0.72px',
                    textAlign: 'center'
                },
            },
            lineColor: 'transparent',
            categories: categories,
            min: 0,
            max: categories.length - 1,
            scrollbar: {
                enabled: scrollbarNeeded,
                height: 6,
                barBackgroundColor: '#5E6081',
                barBorderRadius: 4,
                barBorderWidth: 0,
                trackBackgroundColor: '#101122',
                trackBorderRadius: 4,
                trackBorderWidth: 0
            }
        },

        yAxis: {
            title: {text: ''},
            max: max,
            labels: {
                reserveSpace: true,
                style: {
                    color: '#DBE5E5',
                    fontSize: '12px',
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    letterSpacing: '-0.72px'
                }
            },
            gridLineWidth: 1,
            gridLineColor: '#40415A',
        },
        tickPositions : ticks,
        legend: {enabled: false},

        plotOptions: {
            column: {
                borderRadius: 0,
                borderWidth: 0,
                pointWidth : 40,
            },
            series: {
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    inside: false,
                    align: 'center',
                    verticalAlign: 'top',
                    y: -24,
                    style: {
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'Pretendard',
                        letterSpacing: '-0.72px'
                    },
                    // 동적으로 y값에 따라 위치 조정
                    defer: false,
                    crop: false,
                    overflow: 'allow',
                }
            }
        },

        series: [{
            name: "이벤트 유형",
            data: series,
            color: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, '#8257FF'],
                    [1, '#578CFF']
                ]
            }
        }],

        credits: {enabled: false}
    }

    return (
        <div className={'connectChart'}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}/>
        </div>
    )
}

export default TypeChart