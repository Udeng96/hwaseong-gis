import React, {useEffect} from "react";
import {CodeType} from "../../../../../../conf/interface/common/commonInterface";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useShallow} from "zustand/react/shallow";

const TypeSelectItem = (props: {item : CodeType}) => {

    const {selectEventOption, setSelectEventOption, eventTypeList} = useEventStore(useShallow((state) => ({
        selectEventOption: state.selectEventOption,
        setSelectEventOption: state.actions.setSelectEventOption,
        eventTypeList : state.eventTypeList
    })))

    const handleBox = () =>{
        if(props.item.codeCd === 'all'){
            if(selectEventOption.includes("all/전체".trim().normalize())){
                setSelectEventOption([]);
            }else{
                let newSelectEventOption = eventTypeList.map((type)=> type.codeCd + "/" + type.codeNm);
                setSelectEventOption([...newSelectEventOption, "all/전체".trim().normalize()]);
            }
        }else{
            if(selectEventOption.includes(props.item.codeCd + "/" + props.item.codeNm)){
                if(selectEventOption.includes("all/전체".trim().normalize())){
                    setSelectEventOption(
                        selectEventOption.filter(
                            (opt) =>
                                !opt.includes("all/전체".trim().normalize()) &&
                                !opt.includes(props.item.codeCd)
                        )
                    );
                }else{
                    setSelectEventOption(
                        selectEventOption.filter((opt) => !opt.includes(props.item.codeCd))
                    );
                }
            }else{
                const newOption = [...selectEventOption, props.item.codeCd+"/"+props.item.codeNm];
                if(newOption.length === eventTypeList.length){
                    newOption.push("all/전체".trim().normalize());
                }
                setSelectEventOption(newOption);
            }
        }
    }


    return(
        <div className={`event_check_box`}>
            <label className="container">
                <input type="checkbox"
                       checked={selectEventOption.includes(props.item.codeCd + "/" + props.item.codeNm)}
                       value={props.item.codeCd}
                       onChange={ () => handleBox()}/>
                <span className="checkmark"/>
                <div className="check_name">{`#${props.item.codeNm}`}</div>
            </label>
        </div>
    )

}

export default TypeSelectItem