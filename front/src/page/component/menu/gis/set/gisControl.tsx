import {useMap, useMapEvents} from "react-leaflet";
import {useEffect} from "react";
import L, {CRS, LatLng, LatLngBounds} from "leaflet";
import {GIS_FUNC} from "../../../../conf/const/common/gisConst";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useEventStore} from "../../../../data/store/zustand/eventStore";
import {useCctvStore} from "../../../../data/store/zustand/cctvStore";

const GisControl = () => {

    const map = useMap();

    const {activeZoom, activeCenter, activeBase, activeFunc, activeAddr, activeEventCctv, setActiveZoom, setActiveCenter, setActiveCast} = useGisStore(useShallow((state)=> ({
        activeZoom : state.activeZoom,
        activeCenter : state.activeCenter,
        activeBase : state.activeBase,
        activeFunc : state.activeFunc,
        activeAddr : state.activeAddr,
        activeEventCctv : state.activeEventCctv,
        setActiveZoom : state.actions.setActiveZoom,
        setActiveCenter : state.actions.setActiveCenter,
        setActiveCast : state.actions.setActiveCast
    })))

    const activeEvent = useEventStore((state)=> state.activeEvent)
    const activeCctv = useCctvStore((state)=> state.activeCctv)

    useEffect(() => {
        if (activeEvent){
            map.panTo(new LatLng(Number(activeEvent.lat), Number(activeEvent.lon)),{animate : true});
            setActiveCenter([Number(activeEvent.lat), Number(activeEvent.lon)]);
        }
    }, [activeEvent]);

    useEffect(()=>{
        if(activeCctv){
            setActiveCenter([Number(activeCctv.cctvLat), Number(activeCctv.cctvLon)])
            map.panTo(new LatLng(Number(activeCctv.cctvLat), Number(activeCctv.cctvLon)),{animate : true});
        }
    },[activeCctv])

    useEffect(() => {
        if (activeAddr){
            map.panTo(new LatLng(Number(activeAddr.y), Number(activeAddr.x)),{animate : true});
            setActiveCenter([Number(activeAddr.y), Number(activeAddr.x)]);
        }
    }, [activeAddr]);

    useEffect(() => {
        if (activeEventCctv){
            setActiveCenter([Number(activeEventCctv.cctvLat), Number(activeEventCctv.cctvLon)])
        }
    }, [activeEventCctv]);

    useEffect(() => {

        map.setView(map.getCenter(), activeZoom, {
            animate : true,
            duration : 1,
            easeLinearity : 1,
            noMoveStart : true
        })

    }, [activeZoom]);


    useEffect(() => {
        map.panTo(activeCenter, {animate:false})
    }, [activeCenter]);

    const getMaxBounds = (crs:any) => {
        const {bounds} = crs.projection;
        return new LatLngBounds(
            crs.unproject(bounds.min),
            crs.unproject(bounds.max),
        )
    }

    useEffect(() => {
        const latlng = map.getCenter();
        const bounds = map.getBounds();

        const crs:CRS = L.CRS.EPSG3857
        map.options.crs = crs
        map.options.minZoom = 6;
        map.options.maxZoom = 18;

        map.options.zoomSnap = 0;
        map.fitBounds(bounds);
        map.setMaxBounds(getMaxBounds(crs));
        map.options.zoomSnap = 1;

        map.project(latlng, activeZoom);
        map.setView(latlng,  activeZoom, {
            animate : false
        })

    }, [activeBase]);



    useMapEvents({
        zoom: event => {
            let level = event.target._zoom
            setActiveZoom(level);
        },

        click : event => {
            if (activeFunc === GIS_FUNC.CASTNET){
                setActiveCast([event.latlng.lat, event.latlng.lng])
            }
        }
    })

    return null;

}

export default GisControl