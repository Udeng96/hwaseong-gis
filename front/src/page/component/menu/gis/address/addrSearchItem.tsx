import {SearchAddrType} from "../../../../conf/interface/common/gisInterface";
import {useEffect, useState} from "react";
import {useGisStore} from "../../../../data/store/zustand/gisStore";

const AddrSearchItem = (props:{addr:SearchAddrType, selectType:string}) => {

    const setActiveAddr = useGisStore.getState().actions.setActiveAddr
    const [addrNm, setAddrNm] = useState<string>("");

    useEffect(() => {

        if (props.addr){
            if (props.selectType === 'address'){
                setAddrNm(props.addr.parcel);
            }else if (props.selectType === 'road'){
                setAddrNm(props.addr.road)
            }else{
                setAddrNm(props.addr.title)
            }
        }

    }, [props.addr]);

    const handleClickItem = () => {
        setActiveAddr(props.addr);
    }



    return (
        <div className={`gis_search_list_item`} onClick={handleClickItem}>
            <p className={"gis_search_list_name"} >{addrNm}</p>
            <p className={"gis_search_list_location"}>위도 : {props.addr.y} , 경도 :{props.addr.x}</p>
        </div>
    )

}

export default AddrSearchItem