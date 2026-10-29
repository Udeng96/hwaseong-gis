import {create} from "zustand/react";
import {FacInfoType, LegendType} from "../../../conf/interface/legend/legendInterface";
import {TreeRootType} from "../../../conf/interface/common/commonInterface";

interface LegendStoreType {
    layerList : LegendType[],
    layerNodeList : TreeRootType[],
    activeLayerList : string[],
    activeFac : FacInfoType | null,

    actions:{
        setLayerList : (layerList : LegendType[]) => void;
        setLayerNodeList : (layerNodeList : TreeRootType[]) => void;
        setActiveLayerList : (activeLayerList : string[]) => void;
        setActiveFac : (activeFac : FacInfoType | null) => void;
    }
}

export const useLegendStore = create<LegendStoreType>((set) => ({
    layerList : [],
    layerNodeList : [],
    activeLayerList : [],
    activeFac : null,
    actions:{
        setLayerList : (layerList) => set({layerList}),
        setLayerNodeList : (layerNodeList)=> set({layerNodeList}),
        setActiveLayerList : (activeLayerList)=>set({activeLayerList}),
        setActiveFac : (activeFac) => set({activeFac}),
    }
}))