import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {fetchSearchAddr} from "../../../../data/api/gis/commonApis";
import {SearchAddrType} from "../../../../conf/interface/common/gisInterface";
import AddrSearchItem from "./addrSearchItem";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useQuery} from "@tanstack/react-query";

const AddrSearch = () => {

    const {activeAddrKey,addrList, setActiveAddrKey, setActiveAddr, setAddrList,isClear} = useGisStore(useShallow((state)=> ({
        activeAddrKey : state.activeAddrKey,
        addrList : state.addrList,
        setActiveAddrKey : state.actions.setActiveAddrKey,
        setActiveAddr : state.actions.setActiveAddr,
        setAddrList : state.actions.setAddrList,
        isClear : state.isClear,
    })))

    const [searchKey, setSearchKey] = useState<string>("");
    const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);
    const [selectType, setSelectType] = useState<string>("address");
    const [resultOpen, setResultOpen] = useState<boolean>(false);

    const [isRequest, setIsRequest] = useState<boolean>(false);

    const inputRef : MutableRefObject<any> = useRef();

    const {data : addrRes} = useQuery({
        queryKey : ['addrList'],
        queryFn : () =>  fetchSearchAddr({address:activeAddrKey, type:selectType}),
        enabled : isRequest
    })

    useEffect(()=>{
        if(activeAddrKey === ""){
            setAddrList([]);
        }
    },[activeAddrKey])

    useEffect(()=>{
        setSearchKey("");
        setAddrList([]);
        setActiveAddrKey("");
    },[isClear])

    useEffect(() => {
        if(addrList.length > 0){
            setResultOpen(true);
        }else{
            setResultOpen(false);
        }
    }, [addrList]);

    const handleSearchBtn = () => {
        setActiveAddr(null);
        if(searchKey === ""){
            alert("검색어를 입력해주세요");
            setAddrList([]);
            setActiveAddrKey("");
        }else{
            setActiveAddrKey(searchKey);
            setIsRequest(true);
        }
    }

    useEffect(()=>{
        if(addrRes){
            inputRef.current.blur();
            if(addrRes.data.length === 0){
                alert("검색결과가 존재하지 않습니다.");
                setAddrList([]);
            }else{
                setAddrList(addrRes.data);
            }
        }
        setIsRequest(false);
    },[addrRes])

    const handleClearBtn = () => {
        setSearchKey("");
        setActiveAddrKey("");
        setActiveAddr(null);
        setAddrList([]);
    }


    const handleInputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.currentTarget.value);
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            e.stopPropagation();
        }else{
            if (e.key === "Enter") {
                if (searchKey !== "") {
                    setActiveAddrKey(searchKey);
                    inputRef.current.blur();
                    setIsRequest(true);
                }else{
                    alert("검색어를 입력해주세요");
                    setAddrList([]);
                }
            }
        }
    }


    const handleSelectType = (e: string) => {
        setSelectType(e);
    }

    const setSelectTypeForm = () => {
        if(selectType === 'road'){
            return "도로명";
        }else if(selectType === 'address'){
            return "지번"
        }else{
            return "장소"
        }
    }

    return (
        <div className={`gis_search_area`}>
            <div className={`gis_search_box ${isTypeOpen?'select' : ''} ${resultOpen ? 'active' :''}`}>
                <div className={"gis_search_divide_line"}/>
                <button className={`gis_search_select ${isTypeOpen ? 'active' : ''}`} onClick={()=>setIsTypeOpen(!isTypeOpen)}>{setSelectTypeForm()}
                    <div className={`gis_search_select_wrapper`}>
                        <ul className={`gis_search_select_list`}>
                            <li className={`gis_search_select_item ${selectType === 'address'? 'active' : ''}`} onClick={() => handleSelectType('address')}>지번</li>
                            <li className={`gis_search_select_item ${selectType === 'road'? 'active' : ''}`} onClick={() => handleSelectType('road')}>도로명</li>
                            <li className={`gis_search_select_item ${selectType === 'place'? 'active' : ''}`} onClick={() => handleSelectType('place')}>장소</li>
                        </ul>
                    </div>
                </button>

                <input placeholder={'주소를 입력해주세요'} value={searchKey}
                    ref={inputRef} type={"text"} onKeyDown={(e) => handleEnter(e)}
                       onChange={(e)=> handleInputSearch(e)}/>
                <button className={"search_btn"} onClick={handleSearchBtn}/>
                <button className={"clear_btn"} style={{"display": `${searchKey === '' ? "none" : "block"}`}} onClick={handleClearBtn}/>
            </div>
            <div className={`gis_search_list`}>
                <div className={"gis_search_list_header"}>
                    <p className={"gis_search_list_title"}>
                        <span>'</span>
                        <span className={"word"}>{activeAddrKey}</span>
                        <span>'</span> 검색결과</p>
                </div>
                <div className={"gis_search_list_body"}>
                    {
                        addrList.map((addr) => (
                            <AddrSearchItem addr={addr} selectType={selectType} />
                        ))
                    }
                </div>
            </div>
        </div>
    )

}

export default AddrSearch