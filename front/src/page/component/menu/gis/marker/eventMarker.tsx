import {useMap} from "react-leaflet";
import {useEffect} from "react";
import {EventItemType} from "../../../../conf/interface/event/eventInterface";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {GIS_FUNC} from "../../../../conf/const/common/gisConst";
import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {useEventStore} from "../../../../data/store/zustand/eventStore";
import {DataMarker} from "../../../../conf/interface/common/gisInterface";
import {useGisStore} from "../../../../data/store/zustand/gisStore";

const EventMarker = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const activeEvent = useEventStore((state)=> state.activeEvent)
    const activeFunc = useGisStore((state)=> state.activeFunc);


    const map = useMap();


    useEffect(() => {

        map.eachLayer((l) => {
            if(l.options.pane === 'eventMarker'){
                map.removeLayer(l);
            }
        })

        if(activeLeftMenu === LEFT_TAB_MENU[0].cd &&
            activeFunc !== GIS_FUNC.CASTNET
        ){
            if(activeEvent){
                const eventMarker = makeMarker(activeEvent);
                map.addLayer(eventMarker.getLeafletMarker());
            }
        }

    }, [activeEvent, activeFunc, activeLeftMenu]);


    const renderIcon = () => {
        return L.divIcon({
            className: 'event_custom_icon',
            html: ReactDOMServer.renderToString(
                <div
                    className={`event_cctv_icon locating`}/>
            ),
            iconAnchor: [30, 30]
        })
    }

    const makeMarker = (eventInfo: EventItemType) => {

        return new DataMarker(
            [Number(eventInfo.lat), Number(eventInfo.lon)],{
                pane: 'eventMarker',
                icon: renderIcon(),
                interactive : true,
                data : eventInfo
            }
        )
    }


    return null;
}

export default EventMarker