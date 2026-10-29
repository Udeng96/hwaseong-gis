import * as L from "leaflet";
import {LatLngTuple, Layer} from "leaflet";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {Polyline, useMap} from "react-leaflet";
import {useEventStore} from "../../../../../data/store/zustand/eventStore";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {useEffect, useState} from "react";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import {getClosestClusterMarker} from "../../../../../utils/LeafletUtil";
import {GIS_FUNC} from "../../../../../conf/const/common/gisConst";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";


const LineLayer = (props:{position:LatLngTuple}) => {
    const map = useMap();

    const {
        activeFunc,
        activeZoom,
        activeBase,
        eventCluster,
        setActiveEventCastCctvList,
        setActiveEventCastList
    } = useGisStore(useShallow((state) => ({
        activeCenter : state.activeCenter,
        activeFunc : state.activeFunc,
        activeZoom: state.activeZoom,
        activeBase: state.activeBase,
        eventCluster: state.eventCluster,
        setActiveEventCastCctvList : state.actions.setActiveEventCastCctvList,
        setActiveEventCastList : state.actions.setActiveEventCastList,
    })))

    const activeEvent = useEventStore((state)=> state.activeEvent);
    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);

    const [lineList, setLineList] = useState<{ lat: number, lng: number }[]>([]);

    useEffect(()=>{
        if(eventCluster && activeFunc !== GIS_FUNC.CASTNET && activeLeftMenu === LEFT_TAB_MENU[0].cd){
            // 활성화된 이벤트에서 CCTV들 사이까지의 거리를 정렬
            const sortedCctvsByDistance = eventCluster.getLayers().sort((_a: Layer, _b: Layer) => {
                // @ts-ignore
                const aDistance = L.GeometryUtil.distance(map, props.position, _a._latlng);
                // @ts-ignore
                const bDistance = L.GeometryUtil.distance(map, props.position, _b._latlng);

                return aDistance - bDistance
            }).map((cluster)=> cluster);

            let filterCctvs = [];

            // 중복을 제거하고 6개까지만 허용하기
            sortedCctvsByDistance.forEach((item) => {
                let marker = (item as L.Marker);
                let markerInfo = (marker.options as any).data as CctvItemType;
                if(filterCctvs.length < 6){
                    const findIndex = filterCctvs.map((info)=> info.options.data.cctvId).indexOf(markerInfo.cctvId);
                    // const findIndex = -1;
                    if(findIndex === -1){
                        filterCctvs.push(item);
                    }
                }
            })

            // event Marker에서 가장 가까운 6개 CCTV 지점 구하기
            let cctvLatLngList = filterCctvs.map((cctv)=>{
                const target = getClosestClusterMarker(cctv, activeZoom);
                return {lat : target.lat, lng:target.lng};
            });

            // 라인을 그린다.
            setLineList(cctvLatLngList);

            // 라인이 있으면
            if(cctvLatLngList.length > 0){
                setActiveEventCastCctvList(filterCctvs.map((item)=> item.options.data));
                setActiveEventCastList(cctvLatLngList.map((item)=> [Number(item.lat), Number(item.lng)]))
            }else{
                setActiveEventCastCctvList([]);
                setActiveEventCastList([]);
                setLineList([])
            }

        }else{
            setActiveEventCastCctvList([]);
            setActiveEventCastList([]);
            setLineList([])
        }
    },[eventCluster, activeZoom, activeBase, activeEvent, activeLeftMenu, activeFunc])

    return (
        <>
            {
                lineList.map((line, index) => {
                    return <Polyline key={`Polyline__${index}`} positions={[[line.lat, line.lng], props.position]}
                                     color={'red'}
                                     className={'event_cctv_line'}
                                     fill={true}
                                     pathOptions={{color: 'red'}}
                                     fillColor={'red'}
                                     renderer={L.canvas()}
                    />
                })
            }
        </>
    )
}

export default LineLayer