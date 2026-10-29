import React, {useState} from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";
import TypeTokens from "./typeTokens";
import TypeSelect from "./typeSelect";

const TypeOption = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {selectEventOption, setSelectEventOption} = useEventStore(useShallow((state) => ({
        selectEventOption: state.selectEventOption,
        setSelectEventOption: state.actions.setSelectEventOption
    })))
    return (
        <div className={"select_options"}>
            <p className={"option_title"}><span>&middot;</span>{'이벤트 타입'}</p>
            <div className={`options_select_frame ${isOpen ? 'active' : ''}`}>
                {/*isListOpen이 true면 checkBox open */}
                <TypeSelect/>
                <TypeTokens/>
                <div className={"function_tag_box_frame"}>
                    <button className={`cancel_all_tag_btn ${selectEventOption.length === 0 ? 'dimmed' : ''}`}
                            onClick={() => setSelectEventOption([])}/>
                    <button className={"tag_list_btn"} onClick={() => setIsOpen(!isOpen)}/>
                </div>
            </div>
        </div>
    )

}

export default TypeOption