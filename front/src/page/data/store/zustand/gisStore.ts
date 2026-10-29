import {create} from "zustand/react";
import * as L from "leaflet";
import 'leaflet.markercluster';
import {CENTER} from "../../../conf/config/config";
import {GIS_FUNC} from "../../../conf/const/common/gisConst";
import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";
import {LatLng, LatLngTuple} from "leaflet";
import {SearchAddrType} from "../../../conf/interface/common/gisInterface";
import {EventHeatmapType} from "../../../conf/interface/event/eventInterface";

interface GisStoreType{
    isClear : boolean,
    activeBase : string;
    activeZoom : number;
    activeCenter : LatLngTuple;
    activeFunc : string;
    activeCast : LatLngTuple;
    activeFull : CctvItemType | null,
    cctvCluster : L.MarkerClusterGroup| null,
    activeCctvCluster : LatLngTuple;
    activeCctvClusterList : CctvItemType[],
    activeEventCctv : CctvItemType | null, // 이벤트 탭 활성화시, 지도에서 선택된 CCTV
    eventCluster : L.MarkerClusterGroup| null, // 클러스터링 cctv
    activeEventCluster : LatLngTuple; // 이벤트 탭 활성화시, 지도에서 선택된 CCTV Cluster
    activeEventClusterList : CctvItemType[], // 이벤트 탭 활성화시 표출될, cctv 리스트,
    activeEventCastCctvList : CctvItemType[], // 이벤트 활성화 시, 투망된 카메라 리스트,
    activeEventCastList : LatLngTuple[], // 이벤트 활성화 시, 투망된 카메라 위치 리스트,
    activeCastCctvList : CctvItemType[], // 지도 투망 활성화 시, 투망된 카메라 리스트,
    activeCastList : LatLngTuple[], // 지도 투망 활성화 시, 투망된 카메라 위치 리스트
    addrList : SearchAddrType[],
    activeAddr : SearchAddrType | null,
    activeAddrKey : string,
    activeHeatmapType : string,
    heatmapList : EventHeatmapType[],

    actions:{
        setIsClear : (isClear : boolean) => void;
        setActiveBase : (activeBase : string) => void;
        setActiveZoom : (activeZoom : number) => void;
        setActiveCenter : (activeCenter : LatLngTuple) => void;
        setActiveFunc : (activeFunc: string) =>  void;
        setActiveCast : (activeCast : LatLngTuple) => void;
        setActiveFull : (activeFull : CctvItemType | null) => void;
        setCctvCluster : (cctvCluster : L.MarkerClusterGroup | null) => void,
        setActiveCctvCluster : (activeCctvCluster : LatLngTuple) => void;
        setActiveCctvClusterList : (activeCctvClusterList : CctvItemType[]) => void;
        setActiveEventCctv : (activeEventCctv : CctvItemType | null) => void;
        setEventCluster : (eventCluster : L.MarkerClusterGroup | null) => void,
        setActiveEventCluster : (activeEventClusterList : LatLngTuple) => void;
        setActiveEventClusterList : (activeEventClusterList : CctvItemType[]) => void;
        setActiveEventCastCctvList : (activeEventCastCctvList : CctvItemType[]) => void;
        setActiveEventCastList : (activeEventCastList : LatLngTuple[]) => void;
        setActiveCastCctvList : (activeCastCctvList : CctvItemType[]) => void,
        setActiveCastList : (activeCastList : LatLngTuple[]) => void;
        setAddrList : (addrList: SearchAddrType[]) => void;
        setActiveAddr : (activeAddr : SearchAddrType | null ) => void;
        setActiveAddrKey : (activeAddrKey: string) => void;
        setActiveHeatmapType : (activeHeatmapType : string) => void;
        setHeatmapList : (heatmapList : EventHeatmapType[]) => void;
    }
}

export const useGisStore = create<GisStoreType>((set) => ({
    isClear : false,
    activeBase : "NORMAL",
    activeZoom : 17,
    activeCenter : CENTER as LatLngTuple,
    activeFunc : GIS_FUNC.NONE,
    activeCast : [0,0],
    activeFull : null,
    cctvCluster : null,
    activeCctvCluster : [0,0],
    activeCctvClusterList : [],
    activeEventCctv : null,
    eventCluster : null,
    activeEventCluster : [0,0],
    activeEventClusterList : [],
    activeEventCastCctvList : [],
    activeEventCastList : [],
    activeCastCctvList : [],
    activeCastList : [],
    addrList : [],
    activeAddr : null,
    activeAddrKey : "",
    activeHeatmapType : "",
    heatmapList : [],
    actions:{
        setIsClear : (isClear) => set({isClear}),
        setActiveBase : (activeBase)=>set({activeBase}),
        setActiveZoom : (activeZoom) => set({activeZoom}),
        setActiveCenter : (activeCenter) => set({activeCenter}),
        setActiveFunc : (activeFunc) => set({activeFunc}),
        setActiveCast : (activeCast)=> set({activeCast}),
        setActiveFull : (activeFull) => set({activeFull}),
        setActiveEventCctv : (activeEventCctv) => set({activeEventCctv}),
        setCctvCluster : (cctvCluster) =>  set({cctvCluster}),
        setActiveCctvCluster : (activeCctvCluster) => set({activeCctvCluster}),
        setActiveCctvClusterList : (activeCctvClusterList)=>set({activeCctvClusterList}),
        setEventCluster : (eventCluster) =>  set({eventCluster}),
        setActiveEventCluster : (activeEventCluster) => set({activeEventCluster}),
        setActiveEventClusterList : (activeEventClusterList)=>set({activeEventClusterList}),
        setActiveEventCastCctvList : (activeEventCastCctvList)=>set({activeEventCastCctvList}),
        setActiveEventCastList : (activeEventCastList)=> set({activeEventCastList}),
        setActiveCastCctvList : (activeCastCctvList) => set({activeCastCctvList}),
        setActiveCastList : (activeCastList) => set({activeCastList}),
        setAddrList : (addrList) => set({addrList}),
        setActiveAddr : (activeAddr)=> set({activeAddr}),
        setActiveAddrKey : (activeAddrKey) => set({activeAddrKey}),
        setActiveHeatmapType : (activeHeatmapType) => set({activeHeatmapType}),
        setHeatmapList : (heatmapList) => set({heatmapList}),
    }
}))