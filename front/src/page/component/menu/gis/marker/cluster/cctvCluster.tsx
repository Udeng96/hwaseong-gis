import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {useEffect} from "react";
import * as L from "leaflet";
import {LeafletEvent} from "leaflet";
import "leaflet.markercluster";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import {useMap} from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import {DataMarker} from "../../../../../conf/interface/common/gisInterface";
import {CctvItemType} from "../../../../../conf/interface/cctv/cctvInterface";

const CctvCluster = () => {
    const map = useMap();
    const {
        activeZoom,
        setActiveZoom,
        setActiveCctvCluster,
        setActiveCctvClusterList,
        setActiveCenter,
        cctvCluster,
        setCctvCluster,
        activeCctvCluster
    } = useGisStore(useShallow((state) => ({
        activeZoom: state.activeZoom,
        setActiveZoom: state.actions.setActiveZoom,
        setActiveCctvCluster: state.actions.setActiveCctvCluster,
        setActiveCctvClusterList: state.actions.setActiveCctvClusterList,
        setActiveCenter: state.actions.setActiveCenter,
        cctvCluster: state.cctvCluster,
        setCctvCluster: state.actions.setCctvCluster,
        activeCctvCluster: state.activeCctvCluster,

    })))

    const {cctvList, activeCctv, setActiveCctv} = useCctvStore(useShallow((state) => ({
        cctvList: state.cctvList,
        activeCctv: state.activeCctv,
        setActiveCctv: state.actions.setActiveCctv

    })));

    const activeLeftMenu = useCommonStore((state) => state.activeLeftMenu)


    useEffect(() => {
        if (activeLeftMenu === LEFT_TAB_MENU[1].cd) {
            if (cctvCluster === null) {
                const cluster = new L.MarkerClusterGroup({
                    iconCreateFunction: renderClusterIcon,
                    maxClusterRadius: 60,
                    zoomToBoundsOnClick: false,
                    clusterPane: 'cctvMarker',
                    pane: 'cctvMarker',
                    animate: true,
                    removeOutsideVisibleBounds: true,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    chunkedLoading: true
                })

                setCctvCluster(cluster);
                cluster.on('clusterclick', clusterClick);
                map.addLayer(cluster);

                return () => {
                    if (cctvCluster) {
                        map.removeLayer(cctvCluster);
                    }
                }
            }

        }

    }, [activeLeftMenu])

    const renderClusterIcon = (cluster) => {
        let isActive = (activeCctvCluster[0] === cluster.getLatLng().lat && activeCctvCluster[1] === cluster.getLatLng().lng);
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

    const clusterClick = (event: L.LeafletEvent) => {
        if(activeLeftMenu !== LEFT_TAB_MENU[0].cd){
            const _cluster = event.sourceTarget;
            const lat = _cluster.getLatLng().lat;
            const lng = _cluster.getLatLng().lng;
            const childCount = _cluster.getChildCount();

            if (childCount <= 10) {
                const childClusterList = _cluster.getAllChildMarkers();
                setActiveCenter([lat, lng])
                setActiveCctvCluster([lat, lng]);
                setActiveCctvClusterList(childClusterList.map((item) => item.options.data));

                return;
            } else {
                if (map.getZoom() < 18) {
                    setActiveZoom(map.getZoom() + 1);
                    return;

                } else {
                    const childClusterList = _cluster.getAllChildMarkers() as DataMarker<CctvItemType>[];
                    setActiveCenter([lat, lng])
                    setActiveCctvCluster([lat, lng]);
                    setActiveCctvClusterList(childClusterList.map((item) => item.getData()));
                    event.target.refreshClusters();
                    return;

                }
            }
        }

    }

    const makeMarker = (cctvInfo: CctvItemType) => {
        return new DataMarker(
            [Number(cctvInfo.cctvLat), Number(cctvInfo.cctvLon)], {
                pane: 'cctvMarker',
                data: cctvInfo,
                icon: renderIcon(cctvInfo),
                interactive: true,
                riseOnHover: true,
                riseOffset: 301,
            });
    }

    const renderIcon = (cctvInfo: CctvItemType) => {
        const isActive = activeCctv && (activeCctv.cctvId === cctvInfo.cctvId);
        return L.divIcon({
            className: 'custom-cctv-icon',
            html: ReactDOMServer.renderToString(
                <div
                    className={`cctv_icon ${cctvInfo.cctvClfy.includes('방범') ? 'safeGuard' : 'traffic'} ${cctvInfo.cctvId} ${isActive ? 'active' : ''}`}></div>
            ),
            iconAnchor: [25, 43]
        })
    }

    const markerClick = (e: LeafletEvent) => {
        const info = e.sourceTarget.options.data;


        if (activeCctv) {
            if (info.cctvId === activeCctv.cctvId) {
                setActiveCctv(null);
                setActiveCctvCluster([0,0]);
            } else {
                setActiveCctv(info);
                setActiveCctvCluster([Number(info.cctvLat), Number(info.cctvLon)])
            }
        } else {
            setActiveCctv(info);
            setActiveCctvCluster([Number(info.cctvLat), Number(info.cctvLon)])
        }
    }

    useEffect(() => {
        if (cctvCluster && cctvList.length > 0 && activeLeftMenu === LEFT_TAB_MENU[1].cd) {
            if (cctvList.length > 0) {
                cctvList.forEach((item) => {
                    const marker = makeMarker(item);
                    marker.on('click', markerClick);
                    cctvCluster.addLayer(marker.getLeafletMarker())
                    setCctvCluster(cctvCluster)
                })
            }

            return () => {
                if (cctvCluster) {
                    cctvCluster.clearLayers();
                }
            }
        }


    }, [cctvCluster, cctvList, activeCctvCluster, activeCctv, activeLeftMenu])

    useEffect(() => {

        if (cctvCluster && activeLeftMenu === LEFT_TAB_MENU[1].cd) {
            let clusterOption = (cctvCluster as L.MarkerClusterGroup).options as L.MarkerClusterGroupOptions;
            clusterOption.iconCreateFunction = (c) => renderClusterIcon(c);
            cctvCluster.refreshClusters();
            cctvCluster.eachLayer((l) => {
                if (isCctvDataMarker(l)){
                    const cctvMarker = l as DataMarker<CctvItemType>
                    const cctvData = cctvMarker.getData();
                    l.setIcon(renderIcon(cctvData));
                    l.on('click', markerClick);
                }
            })

            setCctvCluster(cctvCluster);
        }



    }, [activeCctvCluster, cctvList, activeZoom, activeLeftMenu])

    useEffect(() => {
        if (!cctvCluster || !activeCctv || activeLeftMenu !== LEFT_TAB_MENU[0].cd) return;

        // CCTV 마커를 포함한 클러스터를 찾아 activeEventCluster를 갱신
        const allClusters = cctvCluster.getLayers().filter((l) => l instanceof L.MarkerCluster) as L.MarkerCluster[];

        for (const cluster of allClusters) {
            const children = cluster.getAllChildMarkers() as L.Marker[];
            for (const marker of children) {
                const data = (marker as any).options?.data as CctvItemType;
                if (data?.cctvId === activeCctv.cctvId) {
                    const clusterLatLng = cluster.getLatLng();
                    setActiveCctvCluster([clusterLatLng.lat, clusterLatLng.lng]);
                    return;
                }
            }
        }
    }, [activeCctv]);

    function isCctvDataMarker(obj: any): obj is DataMarker<CctvItemType> {
        return obj instanceof DataMarker && /* 추가 조건 */ true;
    }
    return null;


}
export default CctvCluster