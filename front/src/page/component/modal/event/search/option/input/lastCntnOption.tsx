import React from "react";
import {useShallow} from "zustand/react/shallow";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastCntnOption = () => {

    const {selectContentOption, setSelectContentOption} = useLastEventStore(useShallow((state) => ({
        selectContentOption: state.selectContentOption,
        setSelectContentOption: state.actions.setSelectContentOption
    })))

    return (
        <div className={"modal select_options modal"}>
            <p className={"option_title"}><span>&middot;</span>이벤트 내용</p>
            <input className={"placeholder_text"} type={"text"}
                   placeholder={`이벤트 내용을 입력해주세요`}
                   value={selectContentOption !== "" ? selectContentOption : ""}
                   onChange={e => setSelectContentOption(e.currentTarget.value)}/>
        </div>
    )

}

export default LastCntnOption