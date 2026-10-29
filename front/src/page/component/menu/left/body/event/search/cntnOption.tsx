import React from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";

const CntnOption = () => {

    const {selectCntnOption, setSelectCntnOption} = useEventStore(useShallow((state) => ({
        selectCntnOption: state.selectCntnOption,
        setSelectCntnOption: state.actions.setSelectCntnOption
    })))

    return (
        <div className={"select_options"}>
            <p className={"option_title"}><span>&middot;</span>이벤트 내용</p>
            <input className={"placeholder_text"} type={"text"}
                   placeholder={`이벤트 내용을 입력해주세요`}
                   value={selectCntnOption !== "" ? selectCntnOption : ""}
                   onChange={e => setSelectCntnOption(e.currentTarget.value)}/>
        </div>
    )

}

export default CntnOption