import LastTypeTokenItem from "./lastTypeTokenItem";
import React from "react";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastTypeTokens = () => {

    const selectTypeOption = useLastEventStore((state)=> state.selectTypeOption)

    return(
        <>
            {
                <div className={"select_tag_box_frame"}>
                    {
                        selectTypeOption.length === 0 &&
                        <input className={"placeholder_text"} placeholder={"이벤트 타입을 선택해주세요."} readOnly={true}/>
                    }
                    {
                        selectTypeOption.length !== 0 &&
                        <div className={"tag_section"}>
                            {
                                selectTypeOption.includes("all/전체") ?
                                    <LastTypeTokenItem item={'all/전체'}/>
                                    :
                                    selectTypeOption.map((opt, index) => (
                                        index < 6 &&
                                        <LastTypeTokenItem item={opt}/>
                                    ))

                            }
                        </div>
                    }
                    {
                        !selectTypeOption.includes("all/전체") &&
                        selectTypeOption.length > 6 &&
                        <>
                            <div className="tag_more_text">...</div>
                            <div className={"tag_more_count"}>{`+${selectTypeOption.length - 6}`}</div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default LastTypeTokens