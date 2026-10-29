import {useStatStore} from "../../../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
const DateChart= () => {
    const {activeType, monthStatList} = useStatStore(useShallow((state)=> ({
        activeType : state.activeType,
        monthStatList : state.monthStatList
    })))

    const [series, setSeires] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [tick, setTick] = useState<number[]>([]);

    const maxVisible = 7;
    const scrollbarNeeded = categories.length > maxVisible;

    useEffect(()=>{
        if (monthStatList.length > 0) {
            const activeEventType = activeType.split("_")[1];
            const filterMonthStat = monthStatList.filter((item) => item.eventCd === activeEventType);

            if (filterMonthStat.length > 0) {
                const timeStatList = filterMonthStat[0].dateStatList;
                let newSeries = timeStatList.map((item) => item.count);
                let maxValue = Math.max(...newSeries);
                setSeires(timeStatList.map((item) => item.count));
                setCategories(timeStatList.map((item) => item.type));
                setTick(getTickSettingsFixed6(maxValue).tickPositions)

            } else {
                setSeires([]);
                setCategories([]);
            }
        }
    },[activeType, monthStatList])

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
            marginTop: 25,
            marginBottom: 47,
            backgroundColor: 'transparent',
            height : 240,
        },

        title: { text: '' },

        tooltip: { enabled: false },

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
            categories: categories,
            min: 0,
            max: maxVisible - 1,
            scrollbar: {
                enabled: scrollbarNeeded,
                height: 6,
                barBackgroundColor: '#5E6081',
                barBorderRadius: 4,
                barBorderWidth: 0,
                trackBackgroundColor: '#101122',
                trackBorderRadius: 4,
                trackBorderWidth: 0,
            }
        },

        yAxis: {
            title: { text: '' },
            labels: {
                style: {
                    color: '#DBE5E5',
                    fontSize: 13,
                    fontWeight: 400,
                    fontFamily: 'Pretendard',
                    letterSpacing: '-0.72px'
                },
            },
            tickPositions : tick,
            gridLineWidth: 1,
            gridLineColor: '#40415A',
        },

        legend: { enabled: false },

        plotOptions: {
            series: {
                lineColor: '#FFE66D',
                marker: {
                    symbol: 'circle',
                    radius: 4,
                    enabled: true,
                    fillColor: '#FFE66D',
                    lineColor: 'rgba(255, 230, 109, 0.50)',
                    lineWidth: 4,
                    states: {
                        hover: { enabled: false }
                    }
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
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'Pretendard',
                        letterSpacing: '-0.72px'
                    },
                    defer: false,
                    crop: false,
                    overflow: 'allow'
                }
            }
        },

        series: [{
            name: "기간별 이벤트",
            data: series
        }],

        credits: { enabled: false }
    }
    return(
        <div className={'connectChart'}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}/>
        </div>
    )

}

export default DateChart