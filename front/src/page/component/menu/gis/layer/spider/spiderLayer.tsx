import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import {Marker, Pane} from "react-leaflet";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import {GIS_FUNC} from "../../../../../conf/const/common/gisConst";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {useShallow} from "zustand/react/shallow";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";
import {useEventStore} from "../../../../../data/store/zustand/eventStore";
import LineLayer from "../line/lineLayer";

const SpiderLayer = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const activeEvent = useEventStore((state)=> state.activeEvent);

    const {activeFunc, activeEventCastList} = useGisStore(useShallow((state)=> ({
        activeFunc : state.activeFunc,
        activeEventCastList : state.activeEventCastList
    })))



    const renderIcon = (index : number) => {
        return L.divIcon({
            className: '',
            html: ReactDOMServer.renderToString(
                <div className={`numbering_img type_event_${index}`}></div>
            ),
            iconAnchor: [55, 60],
        })
    }

    return (
        <>
            <Pane name={'spiderLayer'} style={{zIndex: 1000}}>

                {
                    activeEvent && (activeLeftMenu === LEFT_TAB_MENU[0].cd && activeFunc !== GIS_FUNC.CASTNET)&&
                    <LineLayer position={[Number(activeEvent.lat), Number(activeEvent.lon)]}/>
                }
            </Pane>
            <Pane name={'numberMarker'}>
                {
                    activeEvent && (activeLeftMenu === LEFT_TAB_MENU[0].cd && activeFunc !== GIS_FUNC.CASTNET)&&
                    activeEventCastList.map((eventCast, index)=>(
                        <Marker key={`spider_${index}`} position={eventCast} icon={renderIcon(index+1)}/>
                    ))
                }
            </Pane>
        </>
    )

}

export default SpiderLayer