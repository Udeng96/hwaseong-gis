import React from "react";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";

const TypeTokenItem = (props:{item:string}) => {

    const {selectEventOption,setSelectEventOption} = useEventStore(useShallow((state)=> ({
        selectEventOption : state.selectEventOption,
        setSelectEventOption : state.actions.setSelectEventOption
    })))

    const handleDelBtn = () => {
        if(props.item.includes("all")){
            setSelectEventOption([]);
        }else{
            setSelectEventOption(selectEventOption.filter((opt)=>opt !== props.item));
        }
    }

    return(
        <div className={"select_tag_box"}>
            <p className={"select_tag_name"}>{`#${props.item.split("/")[1]}`}</p>
            <button className={"cancel_tag_btn"} onClick={() => handleDelBtn()}/>
        </div>
    )

}

export default TypeTokenItem