import {STAT_EVENT_TYPE_LIST} from "../../../../../conf/const/stat/statConst";
import {useStatStore} from "../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {MODAL_TYPE} from "../../../../../conf/const/common/commonConst";

const LeftType = (props: { type: string }) => {
    const activeModal = useCommonStore((state) => state.activeModal);
    const {
        setActiveType,
        activeType,
        todayStatList,
        monthStatList,
        dateStatList
    } = useStatStore(useShallow((state) => ({
        setActiveType: state.actions.setActiveType,
        activeType: state.activeType,
        todayStatList: state.todayStatList,
        monthStatList: state.monthStatList,
        dateStatList: state.dateStatList,
    })))

    const setClassNm = (typeCd: string) => {
        if (typeCd === 'NDM') {
            return 'ndms'
        } else if (typeCd === 'ANM') {
            return 'band'
        } else {
            return typeCd;
        }
    }

    return (
        <div className="filter__list">
            {
                STAT_EVENT_TYPE_LIST.map((type) => (
                    <button type="button"
                            className={`filter__item ${activeType === props.type + "_" + setClassNm(type.cd) ? 'active' : ''} filter__item--${setClassNm(type.cd)}`}
                            onClick={() => setActiveType(props.type + "_" + type.cd)}>
                        <div>
                            <p className="label">{type.nm}</p>
                            <p className="value">{
                                activeModal === MODAL_TYPE.STAT &&
                                (props.type === "T" ?
                                    todayStatList.length > 0 &&
                                    todayStatList.filter((today) => today.eventCd === type.cd)[0].totalCnt.toLocaleString() :
                                    props.type === "M" ?
                                        monthStatList.length > 0 &&
                                        monthStatList.filter((month) => month.eventCd === type.cd)[0].allCnt.toLocaleString() :
                                        dateStatList.length > 0 &&
                                        dateStatList.filter((date) => date.eventCd === type.cd)[0].allCnt.toLocaleString())
                            }</p>
                        </div>
                    </button>
                ))
            }
        </div>

    )

}

export default LeftType