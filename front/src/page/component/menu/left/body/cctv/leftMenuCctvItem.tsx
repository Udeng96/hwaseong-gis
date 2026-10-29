import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {useShallow} from "zustand/react/shallow";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";

const LeftMenuCctvItem = (props: {cctv : CctvItemType,index : number}) => {

    const {activeCctv, activePage, setActiveCctv} = useCctvStore(useShallow((state)=> ({
        activeCctv : state.activeCctv,
        activePage : state.activePage,
        setActiveCctv : state.actions.setActiveCctv
    })))

    const setActiveCctvCluster = useGisStore.getState().actions.setActiveCctvCluster

    const handleCctv = () => {
        if(activeCctv){
            if(activeCctv.cctvId === props.cctv.cctvId){
                setActiveCctv(null);
                setActiveCctvCluster([0,0]);
            }else{
                setActiveCctv(props.cctv);
                setActiveCctvCluster([Number(props.cctv.cctvLat), Number(props.cctv.cctvLon)])
            }
        }else{
            setActiveCctv(props.cctv);
            setActiveCctvCluster([Number(props.cctv.cctvLat), Number(props.cctv.cctvLon)])
        }
    }


    return (
        <ul className={`cctv_list_item ${activeCctv ? activeCctv.cctvId === props.cctv.cctvId ? 'active' : '' : ''}`} onClick={handleCctv}>
            <li>{`${(activePage-1)*10+props.index+1}`}</li>
            <li>{`${props.cctv.cctvClfy}`}</li>
            <li className={"cctv_nm"}>{`${props.cctv.cctvNm}`}</li>
        </ul>
    )

}

export default LeftMenuCctvItem