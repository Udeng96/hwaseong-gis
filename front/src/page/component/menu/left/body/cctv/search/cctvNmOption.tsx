import {useCctvStore} from "../../../../../../data/store/zustand/cctvStore";
import React from "react";
import {useShallow} from "zustand/react/shallow";

const CctvNmOption = () => {

    const {selectNmOption, setSelectNmOption} = useCctvStore(useShallow((state) => ({
        selectNmOption: state.selectNmOption,
        setSelectNmOption: state.actions.setSelectNmOption
    })));

    return (
        <div className={"select_options"}>
            <p className={"option_title"}><span>&middot;</span>CCTV명</p>
            <input className={"placeholder_text"} type={"text"}
                   placeholder={`CCTV명을 입력해주세요`}
                   value={selectNmOption !== "" ? selectNmOption : ""}
                   onChange={e => setSelectNmOption(e.currentTarget.value)}/>
        </div>
    )

}

export default CctvNmOption