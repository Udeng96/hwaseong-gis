import {useCctvStore} from "../../../../../../data/store/zustand/cctvStore";
import {useShallow} from "zustand/react/shallow";
import Select, {SingleValue} from "react-select";
import {CctvSelectOptionType} from "../../../../../../conf/interface/cctv/cctvInterface";
import {useEffect, useState} from "react";

const ClfyOption = () => {
    const {cctvClfyList, setSelectClfyOption} = useCctvStore(useShallow((state)=> ({
        cctvClfyList : state.cctvClfyList,
        setSelectClfyOption : state.actions.setSelectClfyOption
    })))

    const [optionList, setOptionList] = useState<CctvSelectOptionType[]>([]);
    const [activeOption, setActiveOption] = useState<CctvSelectOptionType | null>(null);

    useEffect(() => {

        if (cctvClfyList.length > 0) {
            let newOptionList: CctvSelectOptionType[] = [];

            let newOption = {label: '전체', value: ''};
            setActiveOption(newOption);
            newOptionList.push(newOption);
            cctvClfyList.map((cctvType) => {
                let newOption = {label: cctvType.codeNm, value: cctvType.codeCd};
                newOptionList.push(newOption);
            })

            setOptionList(newOptionList);
        }
    }, [cctvClfyList]);
    const handleSelect = (e: SingleValue<CctvSelectOptionType>) => {
        setActiveOption(e);
        if (e !== null) {
            setSelectClfyOption(e.value)
        }
    }

    return(
        <div className={"select_options"}>
            <p className={"option_title"}><span>&middot;</span>CCTV 종류</p>
            <Select isSearchable={false} className={'cctv-purpose'}
                    classNamePrefix={'purpose-select'}
                    defaultMenuIsOpen={false} defaultInputValue={''}
                    options={optionList}
                    value={activeOption}
                    onChange={e => handleSelect(e)}
                    defaultValue={optionList[0]}
            />
        </div>
    )


}

export default ClfyOption