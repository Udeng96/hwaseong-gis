import LeftMenuLegendTree from "./leftMenuLegendTree.tsx";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";
import {LEFT_TAB_MENU} from "../../../../../conf/const/common/commonConst";
import {useLegendStore} from "../../../../../data/store/zustand/legendStore";
import {useQuery} from "@tanstack/react-query";
import {fetchLegendTypeList} from "../../../../../data/api/legend/legendApis";
import {useEffect} from "react";
import {TreeChildType, TreeRootType} from "../../../../../conf/interface/common/commonInterface";
import {useShallow} from "zustand/react/shallow";

const LeftMenuLegend = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu)
    const {layerList, setLayerList, setLayerNodeList, setActiveLayerList} = useLegendStore(useShallow((state)=> ({
        layerList : state.layerList,
        setLayerNodeList : state.actions.setLayerNodeList,
        setLayerList : state.actions.setLayerList,
        setActiveLayerList : state.actions.setActiveLayerList,
    })));

    const {data : legendRes} = useQuery({
        queryKey : ['legendList'],
        queryFn : fetchLegendTypeList,
        enabled : layerList.length === 0
    })

    useEffect(()=>{
        if(legendRes){
            let childNodes : TreeChildType[] = [];

            if (legendRes.data.length>0){
                legendRes.data.map((legend)=>{
                    if (legend.facInfos.length >0){
                        let childNode : TreeChildType = {
                            value: legend.legendId,
                            label: legend.legendNm,
                            className: 'map-leaf'
                        }
                        childNodes.push(childNode);
                    }
                })
            }
            let rootNode : TreeRootType[] = [
                {
                    value : 'fac',
                    label : '시설물',
                    className : 'iot_map_parent',
                    showCheckBox : false,
                    children:childNodes
                }
            ]
            setLayerNodeList(rootNode);
            setLayerList(legendRes.data);
            setActiveLayerList(legendRes.data.map((item)=> item.legendId));
        }
    },[legendRes])

    return (
        <div className={`wrap legend_wrap ${activeLeftMenu === LEFT_TAB_MENU[2].cd ? '' : 'disabled'}`} id={"tab3"}>
            <span className={"legend_setting_title"}>배경 지도 설정</span>
            <div className={"legend_marker_tree"}>
                <LeftMenuLegendTree/>
            </div>
        </div>
    )

}

export default LeftMenuLegend