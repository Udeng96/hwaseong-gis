import ReactDatePicker from "react-datepicker";
import moment from "moment";
import {STAT_TYPE} from "../../../../../conf/const/stat/statConst";
import LeftType from "./leftType";
import {useStatStore} from "../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import FacArea from "../right/fac/facArea";

const StatBodyLeft = () => {

    const {startDtm, setStartDtm, endDtm, setEndDtm, setIsSearch} = useStatStore(useShallow((state)=>({
        startDtm : state.startDtm,
        setStartDtm : state.actions.setStartDtm,
        endDtm : state.endDtm,
        setEndDtm : state.actions.setEndDtm,
        setIsSearch : state.actions.setIsSearch
    })))

    return (
        <div className="panel panel--left">
            {/* filter */}
            <div className="filter">
                {/* 금일 현황 */}
                <div className="filter__group">
                    <h3 className="filter__title">금일 현황<span>({moment().format("M월 DD일")})</span></h3>
                    <LeftType type={STAT_TYPE.TODAY}/>
                </div>
                {/* 월별 현황 */}
                <div className="filter__group">
                    <h3 className="filter__title">월별 현황<span>({moment().format("M월")})</span></h3>
                    <LeftType type={STAT_TYPE.MONTH}/>
                </div>
                <hr/>

                {/* 기간설정 */}
                <div className="period">
                    <h3 className="period__title">기간 검색</h3>
                    <div className="period__search">
                        <div className="stat_datepicker_area">
                            <div className="stat_start_wrap" id="start">
                                <label htmlFor={"statStartDtm"} className={"calendar_stat_input_box"}>{moment(startDtm, "YYYYMMDD").format("YYYY-MM-DD")}</label>
                                <ReactDatePicker
                                    wrapperClassName="statDatePicker"
                                    className={"calendar_stat_input"}
                                    id={"statStartDtm"}
                                    minDate={moment().subtract(3,'months').toDate()}
                                    maxDate={moment().toDate()}
                                    selected={moment(startDtm, "YYYYMMDD").toDate()}
                                    onChange={(e) => setStartDtm(moment(e).format("YYYYMMDD"))}
                                    dateFormat="yyyy-MM-dd"
                                />
                                <i className={"datepicker__icon"}/>
                            </div>

                            <p className="term_text">~</p>

                            <div className="stat_end_wrap" id="end">
                                <label htmlFor={"statEndDtm"} className="calendar_stat_input_box">{moment(endDtm,"YYYYMMDD").format("YYYY-MM-DD")}</label>
                                <ReactDatePicker
                                    wrapperClassName="statDatePicker"
                                    className={"calendar_stat_input"}
                                    id={"statEndDtm"}
                                    maxDate={moment().toDate()}
                                    minDate={moment().subtract(3,'months').toDate()}
                                    selected={moment(endDtm, "YYYYMMDD").toDate()}
                                    onChange={(e) => setEndDtm(moment(e).format("YYYYMMDD"))}
                                    dateFormat="yyyy-MM-dd"
                                />
                                <i className={"datepicker__icon"}/>
                            </div>
                        </div>
                        <button type="button" className="btn-primary" onClick={() => setIsSearch("search")}>검색</button>
                    </div>
                    <LeftType type={STAT_TYPE.DATE}/>
                </div>

            </div>

            {/* 스마트 도시 시설물 현황 */}
            <FacArea/>
        </div>
    )

}

export default StatBodyLeft