import CheckboxTree from 'react-checkbox-tree';
import {useEffect, useState} from "react";
import {PlayArrow} from "@mui/icons-material";
import {useLegendStore} from "../../../../../data/store/zustand/legendStore";
import {useShallow} from "zustand/react/shallow";
import {useGisStore} from "../../../../../data/store/zustand/gisStore";


const LeftMenuLegendTree = () => {

    const {layerList, layerNodeList, activeLayerList, setActiveLayerList} = useLegendStore(useShallow((state)=> ({
        layerList : state.layerList,
        layerNodeList : state.layerNodeList,
        activeLayerList : state.activeLayerList,
        setActiveLayerList : state.actions.setActiveLayerList
    })))

    const isClear = useGisStore((state)=> state.isClear)

    const [checked, setChecked] = useState<string[]>(activeLayerList);
    const [expanded, setExpanded] = useState<string[]>(['fac']);

    useEffect(()=>{
        if(isClear){
            setChecked(layerList.map((item)=> item.legendId))
        }
    },[isClear])


    useEffect(() => {
        setActiveLayerList(checked);
    }, [checked]);

    useEffect(()=>{
        setChecked(activeLayerList);
    },[activeLayerList])

    return (
        <div className={"scroll tree"}>
            <CheckboxTree
                nodes={layerNodeList}
                checked={checked}
                expanded={expanded}
                icons={{expandClose: <PlayArrow/>, expandOpen: <PlayArrow/>}}
                onCheck={(checked) => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
            />
        </div>
    )


}

export default LeftMenuLegendTree