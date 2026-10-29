import {Polyline, useMap} from "react-leaflet";
import {useEffect, useState} from "react";
import * as L from "leaflet";
import {LatLngTuple, Layer, marker, Marker} from "leaflet";
import {getClosestClusterMarker} from "../../../../../utils/LeafletUtil";
import {GIS_FUNC} from "../../../../../conf/const/common/gisConst";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import 'leaflet-geometryutil';
import {DataMarker} from "../../../../../conf/interface/common/gisInterface";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";

const CastLineLayer = (props: { position: LatLngTuple, type: string }) => {

    const map = useMap();

    const {
        activeZoom,
        activeBase,
        activeFunc,
        cctvCluster,
        eventCluster,
        setActiveCastCctvList,
        setActiveCastList,
    } = useGisStore(useShallow((state) => ({
        activeZoom: state.activeZoom,
        activeBase: state.activeBase,
        activeFunc : state.activeFunc,
        cctvCluster: state.cctvCluster,
        eventCluster : state.eventCluster,
        setActiveCastCctvList : state.actions.setActiveCastCctvList,
        setActiveCastList : state.actions.setActiveCastList,
    })))


    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu)


    const [lineList, setLineList] = useState<{ lat: number, lng: number }[]>([]);

    useEffect(() => {
        if (eventCluster || cctvCluster) {
            let sortedCctvsByDistance : L.Layer[]  = [];

            if(activeFunc === GIS_FUNC.CASTNET && (props.position[0] !== 0 || props.position[1] !== 0)){
                // 이벤트 탭일 경우
                if(activeLeftMenu === LEFT_TAB_MENU[0].cd){
                    if(eventCluster){
                        sortedCctvsByDistance = eventCluster.getLayers().sort((_a: Layer, _b: Layer) => {
                            // @ts-ignore
                            const aDistance = L.GeometryUtil.distance(map, props.position, _a._latlng);
                            // @ts-ignore
                            const bDistance = L.GeometryUtil.distance(map, props.position, _b._latlng);

                            return aDistance - bDistance
                        }).map((cluster)=> cluster);
                    }
                }else if(activeLeftMenu === LEFT_TAB_MENU[1].cd){
                    if(cctvCluster && (props.position[0] !== 0 || props.position[1] !== 0)){
                        sortedCctvsByDistance = cctvCluster.getLayers().sort((_a: Layer, _b: Layer) => {
                            const markerA = _a as Marker;
                            const markerB = _b as Marker;
                            // @ts-ignore
                            const aDistance = L.GeometryUtil.distance(map, props.position, markerA.getLatLng());
                            // @ts-ignore
                            const bDistance = L.GeometryUtil.distance(map, props.position, markerB.getLatLng());

                            return aDistance - bDistance
                        }).map((cluster)=> cluster);
                    }
                }else{
                    setActiveCastCctvList([]);
                    setActiveCastList([]);
                    setLineList([]);
                }

                let filterCctvs  = [];

                // 중복을 제거하고 6개까지만 허용하기
                sortedCctvsByDistance.forEach((item) => {
                    if (isDataMarker(item)) {
                        let markerInfo = item;
                        if(filterCctvs.length < 6){
                            const findIndex = filterCctvs.map((info)=> info.options.data.cctvId).indexOf(()=>markerInfo.getData().cctvId);
                            if(findIndex === -1){
                                filterCctvs.push(item);
                            }
                        }
                    }else{
                        let markerInfo : any = item;
                        if(filterCctvs.length < 6){
                            const findIndex = filterCctvs.map((info)=> info.options.data.cctvId).indexOf(()=>markerInfo.data.cctvId);
                            if(findIndex === -1){
                                filterCctvs.push(item);
                            }
                        }
                    }

                })

                // event Marker에서 가장 가까운 6개 CCTV 지점 구하기
                let cctvLatLngList = filterCctvs.map((cctv)=>{
                    const target = getClosestClusterMarker(cctv, activeZoom);
                    return {lat : target.lat, lng:target.lng};
                });


                setLineList(cctvLatLngList);

                if(cctvLatLngList.length > 0){
                    setActiveCastCctvList(filterCctvs.map((item)=> item.options.data));
                    setActiveCastList(cctvLatLngList.map((item)=> [Number(item.lat), Number(item.lng)]))
                }else{
                    setActiveCastCctvList([]);
                    setActiveCastList([]);
                    setLineList([]);
                }
            }else{
                setActiveCastCctvList([]);
                setActiveCastList([]);
                setLineList([]);
            }
            
        }
    }, [cctvCluster, eventCluster, activeFunc, activeZoom, activeBase, props.position, activeLeftMenu]);


    function isDataMarker(obj: any): obj is DataMarker<CctvItemType> {
        return (
            obj &&
            typeof obj.getData === 'function' &&
            typeof obj.getLeafletMarker === 'function'
        );
    }
    return (
        <>
            {
                lineList.map((line, index) => {
                    return <Polyline key={`Polyline_Cast_${index}`} positions={[[line.lat, line.lng], props.position]}
                                     color={'blue'}
                                     className={'cast_cctv_line'}
                                     fill={true}
                                     pathOptions={{color: 'blue'}}
                                     fillColor={'blue'}
                                     renderer={L.canvas()}
                    />
                })
            }
        </>
    )

}

export default CastLineLayer