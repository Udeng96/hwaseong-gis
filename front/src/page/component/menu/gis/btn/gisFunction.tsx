import {GIS_FUNC} from "../../../../conf/const/common/gisConst";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {LatLngTuple} from "leaflet";

const GisFunction = () => {

    const {activeZoom, activeFunc, setActiveZoom, setActiveFunc, setActiveCastList, setActiveCastCctvList, setActiveCast} = useGisStore(useShallow((state)=> ({
        activeZoom : state.activeZoom,
        activeFunc : state.activeFunc,
        setActiveZoom : state.actions.setActiveZoom,
        setActiveFunc : state.actions.setActiveFunc,
        setActiveCastList : state.actions.setActiveCastList,
        setActiveCastCctvList : state.actions.setActiveCastCctvList,
        setActiveCast : state.actions.setActiveCast
    })))

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);

    const handleZoomIn = () => {
        if (activeZoom<=18){
            setActiveZoom(activeZoom+1);
        }
    }

    const handleZoomOut = () => {
        if (activeZoom>1){
            setActiveZoom(activeZoom-1)
        }
    }

    const handleGisFunc = (func:string) => {
        if (activeFunc === func){
            setActiveFunc(GIS_FUNC.NONE)
            if (activeFunc === GIS_FUNC.CASTNET){
                setActiveCastList([]);
                setActiveCastCctvList([]);
                setActiveCast([0,0] as LatLngTuple);
            }
        }else{
            setActiveFunc(func);
        }
    }


    return (
        <div className={"gis_func_area"}>
            <button className={"func_btn zoom_in"} onClick={handleZoomIn}/>
            <button className={"func_btn zoom_out"} onClick={handleZoomOut}/>
            <button className={`func_btn polyline ${activeFunc === GIS_FUNC.POLYLINE ? 'active' : ''}`} onClick={() => handleGisFunc(GIS_FUNC.POLYLINE)}/>
            <button className={`func_btn polygon  ${activeFunc === GIS_FUNC.POLYGON ? 'active' : ''}`} onClick={() => handleGisFunc(GIS_FUNC.POLYGON)}/>
            {
                activeLeftMenu !== LEFT_TAB_MENU[2].cd &&
                <button className={`func_btn cast_net  ${activeFunc === GIS_FUNC.CASTNET ? 'active' : ''}`} onClick={() => handleGisFunc(GIS_FUNC.CASTNET)}/>
            }
        </div>
    )


}

export default GisFunction