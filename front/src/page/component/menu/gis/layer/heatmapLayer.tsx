import "leaflet.heat";
import {useMap} from "react-leaflet";
import L from "leaflet";
import {useEffect} from "react";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {useGisStore} from "../../../../data/store/zustand/gisStore";


const HeatmapLayer = () => {


    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu)
    const heatmapList = useGisStore((state)=> state.heatmapList)
    const map = useMap();

    useEffect(()=>{
        map.eachLayer((l) => {
            if(l.options.pane === 'heatmapLayer'){
                map.removeLayer(l);
            }
        })
        if(activeLeftMenu === LEFT_TAB_MENU[0].cd){
            if(heatmapList.length !== 0){
                //@ts-ignore
                L.heatLayer(heatmapList, {
                    radius: 25,
                    gradient:{
                        0.1: '#00E626',
                        0.5: '#FFD70D',
                        1: '#FF0040',
                    },
                    blur: 15,
                    max: 1,
                    minOpacity: 0.8,
                    maxZoom: 17,
                    pane: 'heatmapLayer' // Pane 설정
                }).addTo(map);
            }
        }
    },[heatmapList])

    return null;
}

export default HeatmapLayer