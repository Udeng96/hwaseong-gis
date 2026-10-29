import {useQuery} from "@tanstack/react-query";
import {fetchStatFac} from "../../../../../../data/api/stat/statApis";
import {useEffect, useState} from "react";
import {useCommonStore} from "../../../../../../data/store/zustand/commonStore";
import {MODAL_TYPE} from "../../../../../../conf/const/common/commonConst";
import {useStatStore} from "../../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";

const FacArea = () => {

    const activeModal = useCommonStore((state)=> state.activeModal);
    const {facStatList,setFacStatList} = useStatStore(useShallow((state)=>({
        facStatList : state.facStatList,
        setFacStatList : state.actions.setFacStatList
    })))
    const [request, setRequest] = useState<boolean>(true);
    const {data : facCnts} = useQuery({
        queryKey : ['facCnts'],
        queryFn : ()=> fetchStatFac(),
        enabled : request && activeModal === MODAL_TYPE.STAT
    })

    useEffect(()=>{
        if(activeModal !== MODAL_TYPE.STAT){
            setRequest(true);
        }
    },[activeModal])

    useEffect(()=>{
        if(facCnts){
            if(request){
                setFacStatList(facCnts.data);
                setRequest(false);
            }
        }
    },[facCnts, request])

    return(
        <div className="facility">
            <h3 className="facility__title">스마트 도시 시설물 현황</h3>
            <ul className="facility__list">
                {
                    facStatList.map((facStat)=> (
                        <li className="facility__item">{facStat.type}<span>{facStat.count.toLocaleString()}</span></li>
                    ))
                }
            </ul>
        </div>
    )

}

export default FacArea