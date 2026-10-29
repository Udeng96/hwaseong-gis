import {MapContainer, Pane} from "react-leaflet";
import L, {LatLngExpression} from "leaflet";
import 'leaflet/dist/leaflet.css';
import React from "react";
import {ResizeMap} from "./set/ResizeMap";
import GisControl from "./set/gisControl";
import BaseLayer from "./layer/baseLayer";
import EventMarker from "./marker/eventMarker";
import FullPopupPlayer from "./popup/player/fullPopupPlayer";
import AddrSearch from "./address/addrSearch";
import GisFunction from "./btn/gisFunction";
import BaseChkLayer from "./btn/baseChkLayer";
import HeatmapBtn from "./btn/heatmapBtn";
import ClearLayer from "./btn/clearLayer";
import HeatmapLayer from "./layer/heatmapLayer";
import {CENTER} from "../../../conf/config/config";
import CctvCluster from "./marker/cluster/cctvCluster";
import CctvListPopup from "./popup/cluster/cctvListPopup";
import CctvPlayer from "./popup/player/cctvPlayer";
import {useGisStore} from "../../../data/store/zustand/gisStore";
import CastSpiderLayer from "./layer/spider/castSpiderLayer";
import CastMarker from "./marker/castMarker";
import FacPopup from "./popup/facPopup";
import FacMarker from "./marker/facMarker";
import AddrMarker from "./marker/addrMarker";
import EventCluster from "./marker/cluster/eventCluster";
import EventListPopup from "./popup/cluster/eventListPopup";
import EventPlayer from "./popup/player/eventPlayer";
import SpiderLayer from "./layer/spider/spiderLayer";
import DrawLayer from "./btn/drawLayer";
import {GIS_FUNC} from "../../../conf/const/common/gisConst";


const GisArea = () => {

    const activeZoom = useGisStore((state)=> state.activeZoom);
    const activeFunc = useGisStore((state)=> state.activeFunc);
    return (
        <section className={"gis_area"}>
            <FullPopupPlayer/>
            <AddrSearch/>
            <GisFunction/>
            <BaseChkLayer/>
            <HeatmapBtn/>
            <ClearLayer/>

            <MapContainer
                attributionControl={false}
                preferCanvas={true}
                renderer={L.canvas()}
                zoomControl={false}
                doubleClickZoom={false}
                zoom={activeZoom}
                minZoom={3}
                maxZoom={18}
                center={CENTER as LatLngExpression}
                scrollWheelZoom={true}
                crs={L.CRS.EPSG3857} // daum 지도에서 사용하는 crs로 변경해 줘야한다.
                style={{width: '100%', height: '100%', zIndex: '10', borderRadius: '10px'}}
            >
                <ResizeMap/>
                <GisControl />

                {/*layer*/}
                <Pane name={'baseMapLayer'}>
                    <BaseLayer/>
                </Pane>
                {/*marker*/}
                <Pane name={'eventMarker'} style={{zIndex: 1002}}>
                    <EventMarker/>
                </Pane>
                <Pane name={'heatmapLayer'}>
                    <HeatmapLayer/>
                </Pane>
                <Pane name={'castMarker'} style={{zIndex: 1002}}>
                    <CastMarker/>
                </Pane>
                <Pane name={'cctvMarker'} style={{zIndex: 1001}}>
                    <CctvCluster/>
                </Pane>
                <Pane name={'eventClusterMarker'} style={{zIndex: 1001}}>
                    <EventCluster/>
                </Pane>
                <Pane name={'addrMarker'} style={{zIndex: 1003}}>
                    <AddrMarker/>
                </Pane>
                <Pane name={'facMarker'} style={{zIndex: 1005}}>
                    <FacMarker/>
                </Pane>

                {/*popup*/}
                <Pane name={'cctvClusterListPopup'} style={{zIndex: 1002}}>
                    <CctvListPopup/>
                </Pane>
                <Pane name={'cctvPopupPlayer'} style={{zIndex: 1005}}>
                    <CctvPlayer/>
                </Pane>
                <Pane name={'eventClusterListPopup'} style={{zIndex: 1003}}>
                    <EventListPopup/>
                </Pane>
                <Pane name={'cctvEventPopupPlayer'} style={{zIndex: 1005}}>
                    <EventPlayer/>
                </Pane>
                <Pane name={'facInfoLayerPopup'} style={{zIndex:1005}}>
                    <FacPopup/>
                </Pane>

                {/*/!*투망*!/*/}
                <SpiderLayer/>
                <CastSpiderLayer/>

                {/*/!*drawLayer*!/*/}
                {
                    (activeFunc === GIS_FUNC.POLYLINE || activeFunc === GIS_FUNC.POLYGON) &&
                    <Pane name={'drawLayer'} style={{zIndex: 1008}}>
                        <DrawLayer/>
                    </Pane>
                }

            </MapContainer>
        </section>

    )

}

export default GisArea