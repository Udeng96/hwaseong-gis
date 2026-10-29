import {CctvItemType} from "../../../conf/interface/cctv/cctvInterface";
import {create} from "zustand/react";
import {CCTV_RESULT_TYPE} from "../../../conf/const/cctv/cctvConst";
import {CodeType} from "../../../conf/interface/common/commonInterface";

interface CctvStoreType {
    cctvReloadCnt : number,
    activeCctv : CctvItemType | null,
    activePage : number,
    cctvList : CctvItemType[],
    cctvClfyList : CodeType[],
    searchCctvType : string,
    selectNmOption : string,
    selectClfyOption : string,
    actions:{
        setCctvReloadCnt: () => void;
        setActiveCctv : (activeCctv: CctvItemType | null) => void,
        setActivePage : (activePage : number) => void,
        setCctvList : (cctvList : CctvItemType[]) => void,
        setCctvClfyList : (cctvClfyList : CodeType[]) => void,
        setSearchCctvType : (searchCctvType: string) => void,
        setSelectNmOption : (selectNmOption : string) => void,
        setSelectClfyOption : (selectClfyOption:string)=> void,
    }
}

export const useCctvStore = create<CctvStoreType>((set) => ({
    cctvReloadCnt :0,
    activeCctv : null,
    activePage : 1,
    cctvList : [],
    cctvClfyList : [],
    searchCctvType : CCTV_RESULT_TYPE.request,
    selectNmOption : "",
    selectClfyOption : "",
    cctvCluster : null,
    actions:{
        setCctvReloadCnt: () => set((state) => ({ cctvReloadCnt: state.cctvReloadCnt + 1 })),
        setActiveCctv : (activeCctv) => set({activeCctv}),
        setActivePage : (activePage) =>  set({activePage}),
        setCctvList : (cctvList)=> set({cctvList}),
        setCctvClfyList : (cctvClfyList) => set({cctvClfyList}),
        setSearchCctvType : (searchCctvType) =>set({searchCctvType}),
        setSelectNmOption : (selectNmOption) => set({selectNmOption}),
        setSelectClfyOption : (selectClfyOption) => set({selectClfyOption}),
    }
}))