import TimeChart from "./timeChart";

const TimeStat = (props: { isShow: boolean }) => {

    return (
        <div className={`frame ${props.isShow ? '' : 'none'}`}>
            <h3 className="frame__title">이벤트 발생 현황<span>(단위 건)</span></h3>
            <TimeChart/>
        </div>
    )
}

export default TimeStat