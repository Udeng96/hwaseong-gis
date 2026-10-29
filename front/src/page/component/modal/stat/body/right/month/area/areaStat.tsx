import AreaChart from "./areaChart";

const AreaStat = () => {

    return(
        <div className="frame frame--rank">
            <h3 className="frame__title">이벤트 발생 높은 지역 Top 5<span>(단위 건)</span></h3>
            <AreaChart/>
        </div>
    )
}

export default AreaStat