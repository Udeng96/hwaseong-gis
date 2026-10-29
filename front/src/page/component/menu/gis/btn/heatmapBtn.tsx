import {HeatmapDate} from "../../../../conf/const/common/gisConst";
import React, {useEffect, useState} from "react";
import {fetchHeatmapList} from "../../../../data/api/event/eventApis";
import moment from "moment/moment";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEventStore} from "../../../../data/store/zustand/eventStore";
import {useQuery} from "@tanstack/react-query";
import {CctvSelectOptionType} from "../../../../conf/interface/cctv/cctvInterface";

const HeatmapBtn = () => {


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [checkedDuration, setCheckedDuration] = useState<string>('')
    const [isRequest, setIsRequest] = useState<boolean>(false);

    const {
        isClear,
        activeHeatmapType,
        setActiveHeatmapType,
        setHeatmapList
    } = useGisStore(useShallow((state) => ({
        isClear: state.isClear,
        activeHeatmapType: state.activeHeatmapType,
        setActiveHeatmapType: state.actions.setActiveHeatmapType,
        setHeatmapList: state.actions.setHeatmapList
    })))

    const eventTypeList = useEventStore((state)=> state.eventTypeList);


    useEffect(() => {
        if (isClear) {
            setCheckedDuration('');
            setActiveHeatmapType("");
            setIsRequest(false);
            setIsOpen(false);
        }
    }, [isClear]);


    const handleClickType = (type: string) => {
        if (type === activeHeatmapType) {
            setActiveHeatmapType("");
            setIsRequest(false);
            setHeatmapList([]);
        } else {
            setActiveHeatmapType(type);
            setIsRequest(true);
        }
    }

    const handleDuration = (item : CctvSelectOptionType ) => {
        setCheckedDuration(item.value);
    }

    const {data: heatmapRes} = useQuery({
        queryKey: ['heatmapList'],
        queryFn: () => fetchHeatmapList({
            startDtm: checkedDuration,
            endDtm: moment().format("YYYYMMDD"),
            statEvetCd: activeHeatmapType
        }),
        enabled: isRequest
    })

    useEffect(()=>{
        if(heatmapRes){
            setHeatmapList(heatmapRes.data);
        }else{
            setHeatmapList([]);
        }
        setIsRequest(false);
    },[heatmapRes])


    return (
        <div className={"gis_heatmap_area"}>
            <button className={`gis_heatmap_setting_btn ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}>히트 맵
            </button>
            <div className={"gis_heatmap_setting_frame"} id={"heatmap"}>
                <header className="gis_heatmap_setting_header term_setting">기간 설정</header>
                <div className={"term_setting_area"}>
                    {
                        HeatmapDate.map((item, index) => (
                            <div className="radio_button_box">
                                <input id={`radio${index}`} name="select" type="radio" className="radio"
                                       value={item.value}
                                       checked={item.value === checkedDuration}
                                       onChange={()=> handleDuration(item)}/>
                                <label className={"radio_label"} htmlFor={`radio${index}`}>{item.label}</label>
                            </div>
                        ))
                    }
                </div>
                <header className="gis_heatmap_setting_header event_setting">이벤트 선택</header>
                <div className={"event setting_area"}>
                    <div className={"event_select_area"}>
                        <div className={"event_select_list"}>
                            {eventTypeList.map((item) => (
                                item.codeCd !== 'CTR' &&
                                <div className="event_type_frame">
                                    <div
                                        className={`event_type_box ${activeHeatmapType === item.codeCd ? 'active' : ''}`}
                                        id={item.codeCd}
                                        onClick={() => handleClickType(item.codeCd)}>
                                        <p className={"event_type_text"}>{item.codeNm}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HeatmapBtn