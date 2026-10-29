import {useMap} from "react-leaflet";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {useEffect} from "react";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import * as L from "leaflet";
import "leaflet.markercluster"
import ReactDOMServer from "react-dom/server";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {DataMarker} from "../../../../../conf/interface/common/gisInterface";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";
import {GIS_FUNC} from "../../../../../conf/const/common/gisConst";
import {LatLng, LatLngTuple} from "leaflet";

const EventCluster = () => {
    const map = useMap();

    const {
        activeFunc,
        activeZoom,
        activeEventCctv,
        eventCluster,
        activeEventCluster,
        setActiveZoom,
        setActiveCenter,
        setEventCluster,
        setActiveEventCluster,
        setActiveEventClusterList,
        setActiveEventCctv
    } = useGisStore(useShallow((state) => ({
        activeFunc: state.activeFunc,
        activeZoom: state.activeZoom,
        activeEventCctv: state.activeEventCctv,
        eventCluster: state.eventCluster,
        activeEventCluster: state.activeEventCluster,
        setActiveZoom: state.actions.setActiveZoom,
        setActiveCenter: state.actions.setActiveCenter,
        setEventCluster: state.actions.setEventCluster,
        setActiveEventCluster: state.actions.setActiveEventCluster,
        setActiveEventClusterList: state.actions.setActiveEventClusterList,
        setActiveEventCctv: state.actions.setActiveEventCctv,
    })))

    const cctvList = useCctvStore((state) => state.cctvList);
    const activeLeftMenu = useCommonStore((state) => state.activeLeftMenu)

    useEffect(() => {
        if (activeLeftMenu === LEFT_TAB_MENU[0].cd) {

            if (eventCluster === null) {
                const cluster = new L.MarkerClusterGroup({
                    iconCreateFunction: eventClusterIconFn,
                    maxClusterRadius: 60,
                    zoomToBoundsOnClick: false,
                    clusterPane: 'eventClusterMarker',
                    pane: 'eventClusterMarker',
                    animate: true,
                    removeOutsideVisibleBounds: true,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    chunkedLoading: true
                })

                setEventCluster(cluster);
                cluster.on('clusterclick', eventClusterClick);
                map.addLayer(cluster);

                return () => {
                    if (eventCluster) {
                        map.removeLayer(eventCluster);
                    }
                }
            }

        }
    }, [activeLeftMenu])

    const eventClusterIconFn = (cluster) => {
        let isActive = (activeEventCluster[0] === cluster.getLatLng().lat && activeEventCluster[1] === cluster.getLatLng().lng);

        return L.divIcon({
            className: `cctv-cctvCluster-icon`,
            html: ReactDOMServer.renderToString(
                <div
                    className={`cctv_icon cctvClustering ${isActive ? 'active' : ''}`}>
                    <div className={"cctvClustering_count"}>{cluster.getChildCount()}</div>
                </div>
            ),
            iconAnchor: [25, 35]
        });
    }

    const eventClusterClick = (event: L.LeafletEvent) => {
        if (activeLeftMenu === LEFT_TAB_MENU[0].cd && activeFunc !== GIS_FUNC.CASTNET) {
            const _cctvCluster = event.sourceTarget;

            const lat = _cctvCluster.getLatLng().lat;
            const lng = _cctvCluster.getLatLng().lng;
            const childCount = _cctvCluster.getChildCount();

            // 최소 클러스터보다 적을 때.
            if (childCount <= 10) {
                const childClusterList = _cctvCluster.getAllChildMarkers();
                setActiveCenter([lat, lng])
                setActiveEventCluster([lat, lng]);
                setActiveEventClusterList(childClusterList.map((item) => item.options.data));

                return;
            } else {
                if (map.getZoom() <= 18) {
                    setActiveZoom(map.getZoom() + 1);
                    return;
                } else {
                    const childClusterList = _cctvCluster.getAllChildMarkers();
                    setActiveCenter([lat, lng])
                    setActiveEventCluster([lat, lng]);
                    setActiveEventClusterList(childClusterList.map((item) => item.options.data));
                    event.target.refreshClusters();
                    return;
                }
            }
        }
    }

    const markerFn = (cctvInfo: CctvItemType) => {
        return new DataMarker(
            [Number(cctvInfo.cctvLat), Number(cctvInfo.cctvLon)], {
                pane: 'eventClusterMarker',
                data: cctvInfo,
                icon: renderIcon(cctvInfo),
                interactive: true,
                riseOnHover: true,
                riseOffset: 301,
            });
    }
    const renderIcon = (cctvInfo: CctvItemType) => {
        const isActive = activeEventCctv && (activeEventCctv.cctvId === cctvInfo.cctvId);
        return L.divIcon({
            className: 'custom-cctv-icon',
            html: ReactDOMServer.renderToString(
                <div className={`cctv_icon general ${cctvInfo.cctvId} ${isActive ? 'active' : ''}`}></div>
            ),
            iconAnchor: [25, 43]
        })
    }

    const markerClick = (e: any) => {

        const info: CctvItemType = e.target.options.data;

        if (activeEventCctv) {
            if (info.cctvId === activeEventCctv.cctvId) {
                setActiveEventCctv(null);
                setActiveEventCluster([0,0]);
            } else {
                setActiveEventCctv(info);
                setActiveEventCluster([Number(info.cctvLat), Number(info.cctvLon)]);
            }
        } else {
            setActiveEventCctv(info);
            setActiveEventCluster([Number(info.cctvLat), Number(info.cctvLon)]);
        }
    }

    useEffect(() => {
        if (eventCluster && cctvList.length > 0 && activeLeftMenu === LEFT_TAB_MENU[0].cd) {

            if (cctvList.length > 0) {
                cctvList.forEach((item) => {
                    const marker = markerFn(item);
                    marker.on('click', markerClick);
                    eventCluster.addLayer(marker.getLeafletMarker())
                    setEventCluster(eventCluster)
                })
            }

            return () => {
                if (eventCluster) {
                    eventCluster.clearLayers();
                }
            }
        }


    }, [eventCluster, cctvList, activeEventCluster, activeEventCctv, activeLeftMenu])

    useEffect(() => {
        if (eventCluster && activeLeftMenu === LEFT_TAB_MENU[0].cd) {
            let eventClusterOption = (eventCluster as L.MarkerClusterGroup).options as L.MarkerClusterGroupOptions;
            eventClusterOption.iconCreateFunction = (c) => eventClusterIconFn(c);
            eventCluster.refreshClusters();
            eventCluster.eachLayer((l) => {
                if (isCctvDataMarker(l)) {
                    const cctvMarker = l as DataMarker<CctvItemType>
                    const cctvData = cctvMarker.getData();
                    l.setIcon(renderIcon(cctvData));
                    l.on('click', markerClick);
                }
            })

            setEventCluster(eventCluster);
        }
    }, [activeEventCluster, activeZoom, cctvList, activeLeftMenu])

    useEffect(() => {
        if (!eventCluster || !activeEventCctv || activeLeftMenu !== LEFT_TAB_MENU[0].cd) return;

        // CCTV 마커를 포함한 클러스터를 찾아 activeEventCluster를 갱신
        const allClusters = eventCluster.getLayers().filter((l) => l instanceof L.MarkerCluster) as L.MarkerCluster[];

        for (const cluster of allClusters) {
            const children = cluster.getAllChildMarkers() as L.Marker[];
            for (const marker of children) {
                const data = (marker as any).options?.data as CctvItemType;
                if (data?.cctvId === activeEventCctv.cctvId) {
                    const clusterLatLng = cluster.getLatLng();
                    setActiveEventCluster([clusterLatLng.lat, clusterLatLng.lng]);
                    return;
                }
            }
        }
    }, [activeEventCctv]);


    function isCctvDataMarker(obj: any): obj is DataMarker<CctvItemType> {
        return obj instanceof DataMarker && /* 추가 조건 */ true;
    }

    return null;


}

export default EventCluster