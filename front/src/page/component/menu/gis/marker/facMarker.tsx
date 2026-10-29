import {useMap} from "react-leaflet";
import {useEffect, useState} from "react";
import L, {LeafletEvent} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {FacInfoType} from "../../../../conf/interface/legend/legendInterface";
import {FAC_ICON_ID} from "../../../../conf/const/common/gisConst";
import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {useLegendStore} from "../../../../data/store/zustand/legendStore";
import {useShallow} from "zustand/react/shallow";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {DataMarker} from "../../../../conf/interface/common/gisInterface";

const FacMarker = () => {


    const map = useMap();
    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu)

    const {layerList, activeLayerList, activeFac, setActiveFac} = useLegendStore(useShallow((state) => ({
        layerList: state.layerList,
        activeLayerList: state.activeLayerList,
        activeFac: state.activeFac,
        setActiveFac: state.actions.setActiveFac
    })))


    const [selectFacList, setSelectFacList] = useState<FacInfoType[]>([]);

    useEffect(() => {
        if (activeLayerList.length > 0) {
            const filterLayerList = layerList.filter((layer) => activeLayerList.includes(layer.legendId));
            if (filterLayerList.length > 0) {
                let newFacList = [];

                filterLayerList.forEach((layer)=>{
                    newFacList = [...newFacList, ...layer.facInfos];
                })
                setSelectFacList(newFacList);
            } else {
                setSelectFacList([]);
            }
        } else {
            setSelectFacList([]);
        }
    }, [activeLayerList, layerList]);

    useEffect(() => {

        map.eachLayer((l) => {
            if (l.options.pane === 'facMarker') {
                map.removeLayer(l);
            }
        })

        if (selectFacList.length > 0) {
            if (activeLeftMenu === LEFT_TAB_MENU[2].cd) {
                selectFacList.map((fac) => {
                    const marker = makeMarker(fac);
                    marker.on('click', markerClick);
                    map.addLayer(marker.getLeafletMarker());
                })
            }
        }
    }, [selectFacList, activeLeftMenu, activeFac])

    const makeMarker = (facInfo: FacInfoType) => {
        return new DataMarker([Number(facInfo.facLat), Number(facInfo.facLon)], {
            icon: renderIcon(facInfo),
            pane: 'facMarker',
            data: facInfo,
            interactive: true,
        })
    }

    const renderIcon = (facInfo: FacInfoType) => {
        return L.divIcon({
            className: 'fac_custom_icon',
            html: ReactDOMServer.renderToString(
                <div
                    className={`facility_icon ${FAC_ICON_ID[facInfo.facClfyNm]} ${activeFac && (activeFac.facId === facInfo.facId) ? 'active' : ''}`}/>
            ),
            iconAnchor: [30, 30]
        })
    }
    const markerClick = (e: LeafletEvent) => {

        const info: FacInfoType = e.sourceTarget.options.data;

        if (activeFac) {
            if (activeFac.facId === info.facId) {
                setActiveFac(null);
            } else {
                setActiveFac(info);
            }
        } else {
            setActiveFac(info);
        }
    }


    return null;


}

export default FacMarker