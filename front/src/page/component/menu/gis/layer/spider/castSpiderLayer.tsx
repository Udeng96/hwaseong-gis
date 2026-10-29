import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import L, {LatLngTuple} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {Marker, Pane} from "react-leaflet";
import {GIS_FUNC} from "../../../../../conf/const/common/gisConst";
import CastLineLayer from "../line/castLineLayer";

const CastSpiderLayer = () => {

    const {activeFunc, eventCluster, cctvCluster, activeCast, activeCastList} = useGisStore(useShallow((state)=> ({
        activeFunc : state.activeFunc,
        eventCluster : state.eventCluster,
        cctvCluster : state.cctvCluster,
        activeCast : state.activeCast,
        activeCastList : state.activeCastList,
    })))


    const renderCastNetIcon = (index : number) => {
        return L.divIcon({
            className: '',
            html: ReactDOMServer.renderToString(
                <div
                    className={`numbering_img type_castNet_${index}`}></div>
            ),
            iconAnchor: [55, 58],
        })
    }

    return(
        <>
            <Pane name={'castSpiderLayer'} style={{zIndex: 1000}}>
                {
                    activeFunc === GIS_FUNC.CASTNET &&
                    (activeCast[0] !== 0 || activeCast[1] !== 0) &&
                    <CastLineLayer position={activeCast as LatLngTuple} type={'castNet'}/>
                }
            </Pane>
            <Pane name={'castNumberMarker'}>
                {
                    activeFunc === GIS_FUNC.CASTNET&&
                    activeCastList.map((cast, index)=>(
                    <Marker key={`spider_${index}`} position={cast} icon={renderCastNetIcon(index+1)}/>
                    ))
                }
            </Pane>
        </>
        )

}

export default CastSpiderLayer