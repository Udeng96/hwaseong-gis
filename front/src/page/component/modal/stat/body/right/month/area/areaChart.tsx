import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {useStatStore} from "../../../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";

const AreaChart = () => {
    const {activeType, monthStatList} = useStatStore(useShallow((state) => ({
        activeType: state.activeType,
        monthStatList: state.monthStatList
    })));
    const [series, setSeires] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [max, setMax] = useState<number>(0);
    const [ticks, setTicks] = useState<number[]>([]);

    useEffect(() => {
        if(activeType.split("_")[0]==="M"){

            // 법무부 데이터는 주소값이 아예 없어서 일단 필터링은 제거하고 지역 관련 차트 없이 표출하는 것으로 변경
            if(activeType.split("_")[0] === 'ADE'){
                setSeires([]);
            }else{
                if (monthStatList.length > 0) {
                    const activeEventType = activeType.split("_")[1];
                    const filterMonthStat = monthStatList.filter((item) => item.eventCd === activeEventType);

                    if (filterMonthStat.length > 0) {
                        const areaStatList = filterMonthStat[0].areaStatList;
                        let newSeries = areaStatList.map((item)=> item.count);
                        const maxValue = Math.max(...newSeries);
                        setCategories(areaStatList.map((item) => item.type));
                        setMax(getTickSettingsFixed6(maxValue).max);
                        setTicks(getTickSettingsFixed6(maxValue).tickPositions)
                        setSeires(newSeries)
                    } else {
                        setSeires([]);
                        setCategories([]);
                    }
                }
            }

        }
    }, [activeType, monthStatList])

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

    const options ={
        chart: {
            type: 'column',
            spacing: 0,
            marginTop: 20,
            marginBottom: 35,
            backgroundColor: 'transparent',
            height : 240,

        },

        title: { text: '' },
        tooltip: { enabled: false },

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
        },

        yAxis: {
            title: { text: '' },
            labels: {
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
        legend: { enabled: false },

        plotOptions: {
            column: {
                borderRadius: 0,
                borderWidth: 0,
                pointWidth:20
            },
            series: {
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    inside: false,
                    align: 'center',
                    verticalAlign: 'top',
                    y: -22,
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
            color: '#E779A7'
        }],

        credits: { enabled: false }
    }

    return (
        <div className={'connectChart'}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}/>
        </div>
    )

}

export default AreaChart