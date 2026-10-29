import {SysType, UserType} from "../../../conf/interface/common/commonInterface";
import {create} from "zustand/react";
import {LEFT_TAB_MENU, MODAL_TYPE} from "../../../conf/const/common/commonConst";

interface CommonStoreType{
    userInfo : UserType | null,
    sysList : SysType[],
    activeLeftMenu : string,
    activeModal : string,
    actions : {
        setUserInfo : (userInfo : UserType) => void;
        setSysList : (sysList: SysType[]) => void;
        setActiveLeftMenu : (activeLeftMenu : string) => void,
        setActiveModal : (activeModal : string) => void,
    }
}

export const useCommonStore = create<CommonStoreType>((set)=> ({
    userInfo : null,
    sysList : [],
    activeLeftMenu : LEFT_TAB_MENU[0].cd,
    activeModal : MODAL_TYPE.NONE,
    actions:{
        setUserInfo : (userInfo) => set({userInfo}),
        setSysList : (sysList) => set({sysList}),
        setActiveLeftMenu : (activeLeftMenu) => set({activeLeftMenu}),
        setActiveModal : (activeModal) => set({activeModal}),
    }
}))
