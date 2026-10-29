import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useEffect} from "react";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {GIS_FUNC} from "../../../../conf/const/common/gisConst";
import {useMap} from "react-leaflet";
import L, {LatLngTuple} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {DataMarker} from "../../../../conf/interface/common/gisInterface";
import {useShallow} from "zustand/react/shallow";

const CastMarker = () => {


    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu)
    const {activeFunc, activeCast} = useGisStore(useShallow((state)=> ({
        activeFunc : state.activeFunc,
        activeCast : state.activeCast,
    })))

    const map = useMap();



    useEffect(() => {
        map.eachLayer((l) => {
            if(l.options.pane === 'castMarker'){
                map.removeLayer(l);
            }
        })

        if(activeLeftMenu !== LEFT_TAB_MENU[2].cd &&
            activeFunc === GIS_FUNC.CASTNET
        ){
            if(activeCast[0] !== 0 || activeCast[1] !== 0){
                const castMarker = makeCastMarker(activeCast);
                map.addLayer(castMarker.getLeafletMarker());
            }
        }

    }, [activeFunc, activeLeftMenu, activeCast]);


    const renderCastIcon = () => {
        return L.divIcon({
            className: 'event_cast_custom_icon',
            html: ReactDOMServer.renderToString(
                <div
                    className={`event_cctv_icon locating_cast`}/>
            ),
            iconAnchor: [30, 30]
        })
    }

    const makeCastMarker = (castLatLng : LatLngTuple) => {
        return new DataMarker(castLatLng, {
            icon: renderCastIcon(),
            pane: 'castMarker',
            data : 'cast'
        });
    }

    return null;
}

export default CastMarker