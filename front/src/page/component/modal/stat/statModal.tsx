import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {MODAL_TYPE} from "../../../conf/const/common/commonConst";
import StatBody from "./body/statBody";
import {useShallow} from "zustand/react/shallow";
import {useStatStore} from "../../../data/store/zustand/statStore";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchStatDateList, fetchStatTodayList} from "../../../data/api/stat/statApis";
import moment from "moment";
import {STAT_TYPE} from "../../../conf/const/stat/statConst";

const StatModal = () => {

    const {activeModal,setActiveModal} = useCommonStore(useShallow((state) => ({
        activeModal: state.activeModal,
        setActiveModal: state.actions.setActiveModal
    })))

    const {isSearch, setIsSearch, todayStatList, monthStatList, dateStatList, setTodayStatList, setMonthStatList, setDateStatList, startDtm, endDtm, setStartDtm, setEndDtm, setActiveType} = useStatStore(useShallow((state)=> ({
        isSearch : state.isSearch,
        setIsSearch : state.actions.setIsSearch,
        todayStatList : state.todayStatList,
        monthStatList : state.monthStatList,
        dateStatList: state.dateStatList,
        setTodayStatList : state.actions.setTodayStatList,
        setMonthStatList : state.actions.setMonthStatList,
        setDateStatList : state.actions.setDateStatList,
        startDtm : state.startDtm,
        endDtm : state.endDtm,
        setStartDtm : state.actions.setStartDtm,
        setEndDtm : state.actions.setEndDtm,
        setActiveType : state.actions.setActiveType,
    })))

    const {data : todayStatRes} = useQuery({
        queryKey : ['todayStatList'],
        queryFn : ()=> fetchStatTodayList(),
        enabled : isSearch ==="request" && activeModal === MODAL_TYPE.STAT
    })

    const {data : monthStatRes} = useQuery({
        queryKey : ['monthStatList'],
        queryFn : ()=> fetchStatDateList({param:{startDtm:moment().format("YYYYMM")+"01", endDtm: moment().format("YYYYMMDD")}}),
        enabled : isSearch === "request" && activeModal === MODAL_TYPE.STAT
    })

    const {data : dateStatRes} = useQuery({
        queryKey : ['dateStatList'],
        queryFn : ()=> fetchStatDateList({param:{startDtm: startDtm, endDtm : endDtm}}),
        enabled : (isSearch === "request" || isSearch === "search" ) && activeModal === MODAL_TYPE.STAT
    })

    useEffect(()=>{
        if(todayStatRes){
            setTodayStatList(todayStatRes.data);
        }
    },[todayStatRes])

    useEffect(()=>{
        if(monthStatRes){
            setMonthStatList(monthStatRes.data);
        }
    },[monthStatRes])

    useEffect(()=>{
        if(dateStatRes){
            setDateStatList(dateStatRes.data);
            if(isSearch === "search"){
                setIsSearch("success");
            }
        }
    },[dateStatRes])

    useEffect(()=>{
        if(todayStatList.length !== 0 && monthStatList.length !== 0 && dateStatList.length !== 0){
            setIsSearch("success");
        }
    },[todayStatList, monthStatList, dateStatList])



    const closeModalBtn = () => {
        setActiveModal(MODAL_TYPE.NONE);
        setDateStatList([]);
        setMonthStatList([]);
        setTodayStatList([]);
        setStartDtm(moment().subtract(1,'month').format("YYYYMMDD"));
        setEndDtm(moment().format("YYYYMMDD"));
        setActiveType(STAT_TYPE.TODAY+"_"+'FFT');
        setIsSearch("request");
    }


    return (
        <section className={`stat_modal_frame`}>
            <div className={`stat_modal statistics ${activeModal === MODAL_TYPE.STAT ? '' : 'hidden'}`}>
                <div className="stat_modal__content">
                    <div className="stat_modal__head">
                        <h2 className="stat_modal__title">스마트 도시 현황 통계</h2>
                        <button className="btn__close" onClick={()=>closeModalBtn()}></button>
                    </div>
                    <StatBody/>
                </div>
            </div>
        </section>
    )
}

export default StatModal