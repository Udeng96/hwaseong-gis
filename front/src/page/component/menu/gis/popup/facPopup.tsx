import {useCommonStore} from "../../../../data/store/zustand/commonStore";
import {useShallow} from "zustand/react/shallow";
import {useLegendStore} from "../../../../data/store/zustand/legendStore";
import {useEffect, useState} from "react";
import {LEFT_TAB_MENU} from "../../../../conf/const/common/commonConst";
import {Popup} from "react-leaflet";
import moment from "moment";

const FacPopup = () => {

    const activeLeftMenu = useCommonStore((state)=> state.activeLeftMenu);
    const {activeFac, setActiveFac} = useLegendStore(useShallow((state) => ({
        activeFac: state.activeFac,
        setActiveFac: state.actions.setActiveFac
    })))

    const [isFacOpen, setIsFacOpen] = useState<boolean>(false);

    useEffect(() => {
        if (activeLeftMenu === LEFT_TAB_MENU[2].cd) {
            if (activeFac) {
                setIsFacOpen(true);
            } else {
                setIsFacOpen(false);
            }
        } else {
            setIsFacOpen(true);
        }
    }, [activeFac, activeLeftMenu])

    const handleClsBtn = () => {
        setActiveFac(null);
    }

    return (
        <>
            {
                activeFac && isFacOpen &&
                <Popup
                    position={[Number(activeFac.facLat), Number(activeFac.facLon)]} autoPan={false} autoClose={false}
                    closeButton={false}>
                    <div className={"facility_popup_wrapper"}>
                        <div className={"facility_popup_header"}>
                            {activeFac.facClfyNm}
                            <button className={"facility_popup_cls_btn"} onClick={handleClsBtn}/>
                        </div>
                        <table className={"facility_popup_body"}>
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <td>관리번호</td>
                                <td>{activeFac.mgtNo ? activeFac.mgtNo : ''}</td>
                                <td>설치날짜</td>
                                <td>{activeFac.creDtm ? moment(activeFac.creDtm, 'YYYYMMDDHHmmssSSS').format('YYYY-MM-DD') : ''}</td>
                            </tr>
                            <tr>
                                <td>시설물 명</td>
                                <td colSpan={3}>{activeFac.facNm}</td>
                            </tr>
                            <tr>
                                <td>장소 명</td>
                                <td colSpan={3}>-</td>
                            </tr>
                            <tr>
                                <td>도로명 주소</td>
                                <td colSpan={3}>-</td>
                            </tr>
                            <tr>
                                <td>지번 주소</td>
                                <td colSpan={3}>{activeFac.facAddr ? activeFac.facAddr : '-'}</td>
                            </tr>
                            <tr>
                                <td>설치좌표(X)</td>
                                <td>{activeFac.facLon}</td>
                                <td>설치좌표(Y)</td>
                                <td>{activeFac.facLat}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Popup>
            }
        </>
    )

}

export default FacPopup