import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";
import {EVENT_SEARCH_DATE, EVENT_SEARCH_DATE_LIST} from "../../../../../../conf/const/event/eventConst";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

const LastDateOption = () => {

    const {selectStartDtmOption, selectEndDtmOption, selectPeriod, setSelectStartDtmOption, setSelectEndDtmOption, setSelectPeriod} = useLastEventStore(useShallow((state)=> ({
        selectStartDtmOption : state.selectStartDtmOption,
        selectEndDtmOption : state.selectEndDtmOption,
        selectPeriod : state.selectPeriod,
        setSelectStartDtmOption : state.actions.setSelectStartDtmOption,
        setSelectEndDtmOption : state.actions.setSelectEndDtmOption,
        setSelectPeriod : state.actions.setSelectPeriod,
    })))

    const setPeriodByDate = (startDtm: string, endDtm: string, ) => {

        const periodIndex = EVENT_SEARCH_DATE_LIST.findIndex((period) => period.startDtm === startDtm );
        if (periodIndex > -1) {
            if(endDtm === moment().format("YYYYMMDD")){
                return EVENT_SEARCH_DATE_LIST[periodIndex].cd;
            }
        } else {
            return "none";
        }
    }

    const handleDateBtn = (date : {cd : string, nm: string, startDtm : string}) => {
        setSelectPeriod(date.cd);
        setSelectStartDtmOption(date.startDtm);
        setSelectEndDtmOption(moment().format("YYYYMMDD"));
    }

    const handleStartDtm = (e : Date | null) => {
        if(e !== null){
            setSelectPeriod(setPeriodByDate(moment(e).format("YYYYMMDD"), selectEndDtmOption));
            setSelectStartDtmOption(moment(e).format("YYYYMMDD"));
        }
    }

    const handleEndDtm = (e : Date | null) => {
        if(e !== null){
            setSelectPeriod(setPeriodByDate(selectStartDtmOption, moment(e).format("YYYYMMDD")));
            setSelectEndDtmOption(moment(e).format("YYYYMMDD"));
        }
    }

    return(
        <div className={"options date_option"}>
            <p className={"option_title"}><span>&middot;</span>
                검색 기간 설정</p>
            <div className={"options_select_frame"}>
                <div className={"quick_btn_area"}>
                    {
                        EVENT_SEARCH_DATE_LIST.map((date)=>(
                            <button className={`date_btn ${date.cd} ${selectPeriod === date.cd ? 'active' : ''}`}
                                    onClick={() => handleDateBtn(date)}>{date.nm}
                            </button>
                        ))
                    }
                </div>
                <div className="datepicker_area">
                    <div className="calendar_input_box" id={"start"}>
                        <label htmlFor={"startDtm"} className={"datepicker_btn"}/>
                        <ReactDatePicker wrapperClassName={'datePicker'}
                                         className={'calendar_input'}
                                         id={'startDtm'}
                                         value={moment(selectStartDtmOption, "YYYYMMDD").format("YYYY-MM-DD")}
                                         maxDate={moment(selectEndDtmOption, "YYYYMMDD").toDate()}
                                         onChange={(e) => handleStartDtm(e)}
                                         dateFormat={"yyyy-MM-dd"}
                        />
                    </div>
                    <p className="term_text">~</p>
                    <div className="calendar_input_box" id={"end"}>
                        <label htmlFor={"endDtm"} className={"datepicker_btn"}/>
                        <ReactDatePicker wrapperClassName={'datePicker'}
                                         className={'calendar_input'}
                                         id={'endDtm'}
                                         maxDate={moment().toDate()}
                                         minDate={moment(selectStartDtmOption, "YYYYMMDD").toDate()}
                                         value={moment(selectEndDtmOption, "YYYYMMDD").format("YYYY-MM-DD")}
                                         onChange={(e) => handleEndDtm(e)}
                        >
                        </ReactDatePicker>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default LastDateOption