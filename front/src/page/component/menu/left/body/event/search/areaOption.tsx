import React from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";

const AreaOption = () => {

    const {selectAreaOption, setSelectAreaOption} = useEventStore(useShallow((state) => ({
        selectAreaOption: state.selectAreaOption,
        setSelectAreaOption: state.actions.setSelectAreaOption
    })))

    return (
        <div className={"select_options"}>
            <p className={"option_title"}><span>&middot;</span>발생 지역</p>
            <input className={"placeholder_text"} type={"text"}
                   placeholder={`주소를 입력해주세요`}
                   value={selectAreaOption !== "" ? selectAreaOption : ""}
                   onChange={e => setSelectAreaOption(e.currentTarget.value)}/>
        </div>
    )

}

export default AreaOption