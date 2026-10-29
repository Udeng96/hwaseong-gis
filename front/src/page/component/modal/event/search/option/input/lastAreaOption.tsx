import React from "react";
import {useShallow} from "zustand/react/shallow";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastAreaOption = () => {

    const {selectAddrOption, setSelectAddrOption} = useLastEventStore(useShallow((state) => ({
        selectAddrOption: state.selectAddrOption,
        setSelectAddrOption: state.actions.setSelectAddrOption
    })))

    return (
        <div className={"modal select_options modal"}>
            <p className={"option_title"}><span>&middot;</span>발생 지역</p>
            <input className={"placeholder_text"} type={"text"}
                   placeholder={`주소를 입력해주세요`}
                   value={selectAddrOption !== "" ? selectAddrOption : ""}
                   onChange={e => setSelectAddrOption(e.currentTarget.value)}/>
        </div>
    )

}

export default LastAreaOption