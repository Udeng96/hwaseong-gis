import React, {useState} from "react";
import {useShallow} from "zustand/react/shallow";
import LastTypeTokens from "./lastTypeTokens";
import LastTypeSelect from "./lastTypeSelect";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastTypeOption = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {selectTypeOption, setSelectTypeOption} = useLastEventStore(useShallow((state) => ({
        selectTypeOption: state.selectTypeOption,
        setSelectTypeOption: state.actions.setSelectTypeOption
    })))
    return (
        <div className={"options select_options modal"}>
            <p className={"option_title"}><span>&middot;</span>{'이벤트 타입'}</p>
            <div className={`options_select_frame ${isOpen ? 'active' : ''}`}>
                {/*isListOpen이 true면 checkBox open */}
                <LastTypeSelect/>
                <LastTypeTokens/>
                <div className={"function_tag_box_frame"}>
                    <button className={`cancel_all_tag_btn ${selectTypeOption.length === 0 ? 'dimmed' : ''}`}
                            onClick={() => setSelectTypeOption([])}/>
                    <button className={"tag_list_btn"} onClick={() => setIsOpen(!isOpen)}/>
                </div>
            </div>
        </div>
    )

}

export default LastTypeOption