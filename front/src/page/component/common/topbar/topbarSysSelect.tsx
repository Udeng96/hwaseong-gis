import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchSysList} from "../../../data/api/common/commonApis";
import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {SysType} from "../../../conf/interface/common/commonInterface";
import {useShallow} from "zustand/react/shallow";

const TopbarSysSelect = () =>{

    const userInfo = useCommonStore((state)=> state.userInfo);
    const [isSysSelectOpen, setIsSysSelectOpen] = useState<boolean>(false);
    const [sysList, setSysList] = useState<SysType[]>([]);
    const [selectSys, setSelectSys] = useState<string>('');
    const formRef: React.LegacyRef<HTMLFormElement> = useRef(null)

    const {data : sysListRes} = useQuery({
        queryKey : ['sysList'],
        queryFn : () =>  fetchSysList(),
        enabled : sysList.length === 0 && userInfo !== null,
    })

    useEffect(() => {
        if(sysListRes){
            if (sysListRes.data.length > 0) {
                setSysList(sysListRes.data);
                sysListRes.data.map((item)=>{
                    if (item.url.includes('/gisNew')){
                        setSelectSys(item.url);
                    }
                })
            }
        }
    }, [sysListRes]);

    const handleSystem = (sysUrl : string) => {
        let newSelectSys = sysUrl
        setSelectSys(sysUrl)
        let url = newSelectSys;
        if (url.includes('http://')) { // http가 포함되어 있으면
            url = newSelectSys; // 그냥 그 자체로
        } else { // 포함 안되어 있으면
            if (url.includes('https://')){
                url = newSelectSys;
            }else{
                url = `http://40.10.10.52${newSelectSys}`; // 직접 앞에 추가해주기.
            }
        }
        // form 구조. select 를 누르면 submit 되면서 해당 페이지로 이동시킨다.
        // input 태그의 value값을 받아와 토큰을 전달한다.
        if (formRef.current) {
            formRef.current.action = url
            formRef.current.submit();
        }
    }

    const setSysNameForm = () => {
        let result = "";
        sysList.map((sys)=>{
            if (sys.url === selectSys){
                result = sys.sysName;
            }
        })

        return result;
    }

    return(
        <div>
            <form ref={formRef}>
                <input type="hidden" name="token" value={userInfo ? userInfo.token : ''}/>
            </form>
            <button className={`selector-select ${isSysSelectOpen ? 'active' : ''}`} onClick={()=>setIsSysSelectOpen(!isSysSelectOpen)}>{setSysNameForm()}
                <div className={"select-option-wrapper"}>
                    <ul className={"select-option-list"}>
                        {
                            sysList.map((sys)=> (
                                <li key={`SYS_ITEM_${sys.sysName}`} onClick={()=>handleSystem(sys.url)} className={sys.url === selectSys ? 'active' :''}>{sys.sysName}</li>
                            ))
                        }
                    </ul>
                </div>
            </button>
        </div>
    )

}

export default TopbarSysSelect