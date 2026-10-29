import TypeTokenItem from "./typeTokenItem";
import React, {useEffect} from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";

const TypeTokens = () => {

    const {selectEventOption} = useEventStore(useShallow((state)=> ({
        selectEventOption : state.selectEventOption
    })))

    return(
        <>
            {
                <div className={"select_tag_box_frame"}>

                    {
                        selectEventOption.length === 0 &&
                        <input className={"placeholder_text"} placeholder={"이벤트 타입을 선택해주세요."} readOnly={true}/>
                    }
                    {
                        selectEventOption.length !== 0 &&
                        <div className={"tag_section"}>
                            {
                                selectEventOption.includes("all/전체") ?
                                    <TypeTokenItem item={'all/전체'}/>
                                    :
                                    selectEventOption.map((opt, index) => (
                                        index < 2 &&
                                        <TypeTokenItem item={opt}/>
                                    ))

                            }
                        </div>
                    }
                    {
                        !selectEventOption.includes("all/전체") &&
                        selectEventOption.length > 2 &&
                        <>
                            <div className="tag_more_text">...</div>
                            <div className={"tag_more_count"}>{`+${selectEventOption.length - 2}`}</div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default TypeTokens