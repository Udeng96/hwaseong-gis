import {useEffect, useState} from "react";
import moment from "moment/moment";
import {fetchCctvList} from "../../../../../data/api/cctv/cctvApis";
import {CCTV_RESULT_TYPE} from "../../../../../conf/const/cctv/cctvConst";
import {CctvParamType} from "../../../../../conf/interface/cctv/cctvInterface";
import LeftMenuCctvBodyList from "./leftMenuCctvBodyList";
import {useShallow} from "zustand/react/shallow";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {useQuery} from "@tanstack/react-query";
import {fetchCctvTypeList} from "../../../../../data/api/common/commonApis";
import ClfyOption from "./search/clfyOption";
import CctvNmOption from "./search/cctvNmOption";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";

const LeftMenuCctv = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const {cctvList, cctvClfyList, selectNmOption, selectClfyOption, searchCctvType, setSearchCctvType, setCctvList, setCctvClfyList} = useCctvStore(useShallow((state)=> ({
        cctvList : state.cctvList,
        cctvClfyList : state.cctvClfyList,
        selectNmOption : state.selectNmOption,
        selectClfyOption : state.selectClfyOption,
        searchCctvType : state.searchCctvType,
        setSearchCctvType : state.actions.setSearchCctvType,
        setCctvList : state.actions.setCctvList,
        setCctvClfyList : state.actions.setCctvClfyList,
    })))

    const [updateTime, setUpdateTime] = useState<string>(moment().format("YYYY-MM-DD HH:mm:ss"))

    const payload: CctvParamType = {
        cctvClfy: selectClfyOption,
        cctvNm: selectNmOption,
    }

    const {data : cctvRes, error : cctvErr} = useQuery({
        queryKey : ['cctvList'],
        queryFn : ()=>fetchCctvList(payload),
        enabled : searchCctvType === CCTV_RESULT_TYPE.request,
    })

    const {data : clfyRes, error : clfyErr} = useQuery({
        queryKey : ['clfyList'],
        queryFn : () => fetchCctvTypeList(),
        enabled : cctvClfyList.length === 0,
    })

    useEffect(()=>{
        if(cctvRes){
           setCctvList(cctvRes.data);
           setSearchCctvType(CCTV_RESULT_TYPE.success);
        }else{
            setCctvList([]);
            setSearchCctvType(CCTV_RESULT_TYPE.error)
        }
    },[cctvRes])

    useEffect(()=>{
        if(cctvErr){
            setSearchCctvType(CCTV_RESULT_TYPE.error);
            setCctvList([]);
            console.log("cctv_err : ", cctvErr);
        }
    },[cctvErr])

    useEffect(()=>{
        if(clfyRes){
            setCctvClfyList(clfyRes.data);
        }else{
            setCctvClfyList([]);
        }
    },[clfyRes])

    useEffect(()=>{
        if(clfyErr){
            setCctvClfyList([]);
            console.log("cctv_clfy_err : ", clfyErr);
        }

    },[clfyErr])

    useEffect(()=>{
        if(searchCctvType === CCTV_RESULT_TYPE.request){
            setUpdateTime(moment().format("YYYY-MM-DD HH:mm:ss"));
        }
    },[searchCctvType])


    return (
        <div className={`wrap cctv_wrap ${activeLeftMenu === LEFT_TAB_MENU[1].cd ? '' : 'disabled'}`} id={"tab2"}>
            <div className={"cctv_search_setting"}>
                <div className={"cctv_search_header"}>
                    <h2 className={"cctv_search_title"}>CCTV 검색 조건 설정</h2>
                </div>
                <CctvNmOption/>
                <ClfyOption/>
                <button className={"cctv_search_btn"} onClick={()=>{setSearchCctvType(CCTV_RESULT_TYPE.request)}}><span>검색</span></button>
            </div>
            <div className={"cctv_search_result_info"}>
                                <span className={"search_options"}>
                                      <span
                                          className={"search_result"}>&nbsp;&nbsp;{`검색결과 [${cctvList.length.toLocaleString()}]`}</span>
                                </span>
                <span className={"update_time"}>{`Update : ${updateTime}`}</span>
            </div>
            <LeftMenuCctvBodyList/>

        </div>
    )

}

export default LeftMenuCctv