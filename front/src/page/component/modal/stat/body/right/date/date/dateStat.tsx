import DateChart from "./dateChart";

const DateStat = () => {
    return(
        <div className="frame frame--period">
            <h3 className="frame__title">기간별 이벤트<span>(단위 건)</span></h3>
            <DateChart/>
        </div>
    )

}

export default DateStat