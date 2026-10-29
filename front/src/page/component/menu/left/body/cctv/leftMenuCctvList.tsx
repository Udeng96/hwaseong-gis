import {useEffect, useState} from "react";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import {CCTV_RESULT_TYPE} from "../../../../../conf/const/cctv/cctvConst";
import LeftMenuCctvItem from "./leftMenuCctvItem";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {useShallow} from "zustand/react/shallow";

const LeftMenuCctvList = () => {

    const {cctvList, searchCctvType, activePage} = useCctvStore(useShallow((state)=> ({
        cctvList : state.cctvList,
        searchCctvType : state.searchCctvType,
        activePage : state.activePage
    })))

    const [pageCctvList, setPageCctvList] = useState<CctvItemType[]>([]);

    useEffect(()=>{
        if(cctvList.length > 0){
            const firstItemIndex = (activePage-1)*10;
            const lastItemIndex = (activePage-1)*10+10;

            setPageCctvList(cctvList.filter((_, index)=> index >= firstItemIndex && index < lastItemIndex));
        }else{
            setPageCctvList([]);
        }
    },[activePage, cctvList])

    return (
        <div className={`cctv_list_item_frame ${searchCctvType === CCTV_RESULT_TYPE.error ? 'error' : cctvList.length === 0 ? 'none' : ''}`}>
            {
                searchCctvType === CCTV_RESULT_TYPE.error &&
                <div className={"error_content"}>
                    <div className={"cctv_reload_btn"}/>
                    <div className={"error_cctv_content"}>CCTV 로드에 문제가 발생하였습니다. <br/> Reload 또는 재검색을
                        시도해주세요
                    </div>
                </div>
            }
            {
                searchCctvType === CCTV_RESULT_TYPE.success &&
                cctvList.length === 0 &&
                <div className={"none_content"}>
                    <div className={"no_cctv_icon"}/>
                    <div className={"no_cctv_content"}>검색 조건에 해당하는 CCTV 리스트가 없습니다.</div>
                    <div className={"no_cctv_sub_content"}>검색 조건을 변경하신 후 재검색 해주십시오.
                    </div>
                </div>
            }
            {
                searchCctvType === CCTV_RESULT_TYPE.success &&
                pageCctvList.length > 0 &&
                    pageCctvList.map((cctv, index) => (
                        <LeftMenuCctvItem cctv={cctv} index={index}/>
                    ))
            }
        </div>
    )

}

export default LeftMenuCctvList