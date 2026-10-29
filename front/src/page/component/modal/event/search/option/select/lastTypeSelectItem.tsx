import React from "react";
import {useShallow} from "zustand/react/shallow";
import {CodeType} from "../../../../../../conf/interface/common/commonInterface";
import {useEventStore} from "../../../../../../data/store/zustand/eventStore";
import {useLastEventStore} from "../../../../../../data/store/zustand/lastEventStore";

const LastTypeSelectItem = (props: {item : CodeType}) => {

    const {selectTypeOption, setSelectTypeOption} = useLastEventStore(useShallow((state) => ({
        selectTypeOption: state.selectTypeOption,
        setSelectTypeOption: state.actions.setSelectTypeOption,
    })))
    const eventTypeList = useEventStore((state)=> state.eventTypeList);

    const handleBox = () =>{
        if(props.item.codeCd === 'all'){
            if(selectTypeOption.includes("all/전체".trim().normalize())){
                setSelectTypeOption([]);
            }else{
                let newSelectTypeOption = eventTypeList.map((type)=> type.codeCd + "/" + type.codeNm);
                setSelectTypeOption([...newSelectTypeOption, "all/전체".trim().normalize()]);
            }
        }else{
            if(selectTypeOption.includes(props.item.codeCd + "/" + props.item.codeNm)){
                if(selectTypeOption.includes("all/전체".trim().normalize())){
                    setSelectTypeOption(
                        selectTypeOption.filter(
                            (opt) =>
                                !opt.includes("all/전체".trim().normalize()) &&
                                !opt.includes(props.item.codeCd)
                        )
                    );
                }else{
                    setSelectTypeOption(
                        selectTypeOption.filter((opt) => !opt.includes(props.item.codeCd))
                    );
                }
            }else{
                const newOption = [...selectTypeOption, props.item.codeCd+"/"+props.item.codeNm];
                if(newOption.length === eventTypeList.length){
                    newOption.push("all/전체".trim().normalize());
                }
                setSelectTypeOption(newOption);
            }
        }
    }



    return(
        <div className={`event_check_box`}>
            <label className="container">
                <input type="checkbox"
                       checked={selectTypeOption.includes(props.item.codeCd + "/" + props.item.codeNm)}
                       value={props.item.codeCd}
                       onChange={ () => handleBox()}/>
                <span className="checkmark"/>
                <div className="check_name">{`#${props.item.codeNm}`}</div>
            </label>
        </div>
    )

}

export default LastTypeSelectItem