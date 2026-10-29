import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";
import {useMap} from "react-leaflet";
import {DataMarker, SearchAddrType} from "../../../../conf/interface/common/gisInterface";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import {useEffect} from "react";

const AddrMarker = () => {

    const map = useMap();

    const activeAddr = useGisStore((state)=> state.activeAddr)

    const makeMarker = (addr : SearchAddrType) => {
        return new DataMarker([Number(addr.y), Number(addr.x)],{
            icon : renderIcon(),
            pane : 'addrMarker',
            data : addr,
        })
    }

    const renderIcon = () => {
        return L.divIcon({
            className: 'addr_custom_icon',
            html: ReactDOMServer.renderToString(
                <div
                    className={`search_icon`}/>
            ),
            iconAnchor: [30, 30]
        })
    }

    useEffect(()=>{
        map.eachLayer((l) => {
            //@ts-ignore
            if (l.options.pane === 'addrMarker') {
                map.removeLayer(l);
            }
        })

        if(activeAddr){
            map.addLayer(makeMarker(activeAddr).getLeafletMarker());
        }

    },[activeAddr])

    return null;

}

export default AddrMarker