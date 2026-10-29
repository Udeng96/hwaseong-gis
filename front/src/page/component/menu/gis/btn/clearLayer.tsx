import {GIS_FUNC, MAP_LAYER_TYPE} from "../../../../conf/const/common/gisConst";
import {useLegendStore} from "../../../../data/store/zustand/legendStore";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEventStore} from "../../../../data/store/zustand/eventStore";
import {CENTER} from "../../../../conf/config/config";
import {useCctvStore} from "../../../../data/store/zustand/cctvStore";
import {useEffect} from "react";
import {LatLngTuple} from "leaflet";

const ClearLayer = () => {


    const {layerList, setActiveLayerList, setActiveFac } = useLegendStore(useShallow((state)=> ({
        layerList : state.layerList,
        setActiveLayerList : state.actions.setActiveLayerList,
        setActiveFac : state.actions.setActiveFac
    })))

    const {isClear,setIsClear, setHeatmapList, setActiveHeatmapType, setActiveFunc, setActiveBase,
        setActiveCenter, setActiveZoom, setActiveCastCctvList, setActiveEventCastCctvList, setActiveCastList, setActiveEventCastList,
         setActiveEventCctv, setActiveEventCluster, setActiveCctvCluster, setActiveAddr, setActiveAddrKey, setActiveCast} = useGisStore(useShallow((state)=> ({
        isClear : state.isClear,
        setIsClear : state.actions.setIsClear,
        setHeatmapList : state.actions.setHeatmapList,
        setActiveHeatmapType : state.actions.setActiveHeatmapType,
        setActiveFunc : state.actions.setActiveFunc,
        setActiveBase : state.actions.setActiveBase,
        setActiveZoom : state.actions.setActiveZoom,
        setActiveCenter : state.actions.setActiveCenter,
        setActiveCastCctvList : state.actions.setActiveCastCctvList,
        setActiveCastList : state.actions.setActiveCastList,
        setActiveEventCastCctvList : state.actions.setActiveEventCastCctvList,
        setActiveEventCastList : state.actions.setActiveEventCastList,
        setActiveEventCctv : state.actions.setActiveEventCctv,
        setActiveEventCluster : state.actions.setActiveEventCluster,
        setActiveCctvCluster : state.actions.setActiveCctvCluster,
        setActiveAddr : state.actions.setActiveAddr,
        setActiveAddrKey : state.actions.setActiveAddrKey,
        setActiveCast : state.actions.setActiveCast,
    })))

    const setActiveCctv = useCctvStore.getState().actions.setActiveCctv

    const {setActiveEvent, setOpenEventList} = useEventStore(useShallow((state)=> ({
        setActiveEvent : state.actions.setActiveEvent,
        setOpenEventList : state.actions.setOpenEventList

    })))
    const handleResetBtn= () => {

        setIsClear(true);

        setHeatmapList([]);
        setActiveHeatmapType("");

        setActiveFunc(GIS_FUNC.NONE);
        setActiveBase("NORMAL");
        setActiveZoom(17);
        setActiveCenter(CENTER as LatLngTuple);

        setActiveEvent(null);
        setOpenEventList([]);
        setActiveCastCctvList([]);
        setActiveEventCastCctvList([]);
        setActiveCastList([]);
        setActiveEventCastList([]);

        setActiveEventCctv(null);
        setActiveCctv(null);
        setActiveEventCluster([0,0]);
        setActiveCctvCluster([0,0]);

        setActiveAddr(null);
        setActiveAddrKey("");
        setActiveLayerList(layerList.map((item)=> item.legendId));
        setActiveFac(null);
        setActiveCast([0,0]);
    }

    useEffect(() => {

        let intervalId;
        if (isClear) {
            intervalId = setInterval(() => {
                setIsClear(false);

            }, 3000)
        }
        return () => clearInterval(intervalId);

    }, [isClear]);



    return (
        <div className={"gis_reset_btn"} onClick={handleResetBtn}>초기화</div>
    )

}

export default ClearLayer