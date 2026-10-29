import TypeChart from "./typeChart";
import {useStatStore} from "../../../../../../../data/store/zustand/statStore";

const TypeStat = () => {
    const setIsExcelRequest = useStatStore.getState().actions.setIsExcelRequest;
    const activeType = useStatStore((state)=> state.activeType)
    return(
        <div className="frame frame--event">
            <div className="frame__head">
                <h3 className="frame__title">이벤트 유형<span>(단위 건)</span></h3>
                <button type="button" className="btn-normal btn-download" onClick={()=>setIsExcelRequest(activeType)}>엑셀 다운로드</button>

            </div>
            <TypeChart/>
        </div>
    )

}

export default TypeStat