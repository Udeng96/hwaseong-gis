import React from "react";
import {useShallow} from "zustand/react/shallow";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastTypeTokenItem = (props:{item:string}) => {

    const {selectTypeOption,setSelectTypeOption} = useLastEventStore(useShallow((state)=> ({
        selectTypeOption : state.selectTypeOption,
        setSelectTypeOption : state.actions.setSelectTypeOption
    })))

    const handleDelBtn = () => {
        if(props.item.includes("all")){
            setSelectTypeOption([]);
        }else{
            setSelectTypeOption(selectTypeOption.filter((opt)=>opt !== props.item));
        }
    }

    return(
        <div className={"select_tag_box"}>
            <p className={"select_tag_name"}>{`#${props.item.split("/")[1]}`}</p>
            <button className={"cancel_tag_btn"} onClick={() => handleDelBtn()}/>
        </div>
    )

}

export default LastTypeTokenItem