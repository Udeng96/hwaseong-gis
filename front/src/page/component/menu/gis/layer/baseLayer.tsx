import {TileLayer} from "react-leaflet";
import {MAP_LAYER_TYPE} from "../../../../conf/const/common/gisConst";
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";

const BaseLayer = () => {

    const activeBase = useGisStore((state)=> state.activeBase)
    return (

        <>
            <TileLayer key={`vworld_${MAP_LAYER_TYPE[activeBase].type}`}{...{minZoom: 6, maxZoom: 18}} url={MAP_LAYER_TYPE[activeBase].url}/>
            {
                MAP_LAYER_TYPE[activeBase].type === 'satellite' &&
                <TileLayer key={`vworld_${MAP_LAYER_TYPE["SATE_LABEL"].type}`}{...{minZoom: 6, maxZoom: 18}}
                           url={`${MAP_LAYER_TYPE["SATE_LABEL"].url}`}/>
            }
        </>
    )
}

export default BaseLayer