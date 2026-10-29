import {fetchUserInfo} from "../data/api/common/commonApis";
import React, {useEffect, useState} from "react";
import LeftMenu from "./menu/left/leftMenu";
import RightMenu from "./menu/right/rightMenu";
import GisArea from "./menu/gis/gisArea";
import Topbar from "./common/topbar/topbar";
import {isDev, OMS, OMS_CONTEXT} from "../conf/config/config";
import Cookies from 'js-cookie';
import {useQuery} from "@tanstack/react-query";
import {useCommonStore} from "../data/store/zustand/commonStore";


const Root = () => {

    const [requestUserInfo, setRequestUserInfo] = useState<boolean>(false);

    const setUserInfo = useCommonStore.getState().actions.setUserInfo;

    useEffect(() => {
        // 개발모드가 아니라면
        if (!isDev) {
            // cookie에 저장되어 있는 token 값 가져오기
            // 원래는 session storage에 저장하려고 했으나 저장이 안됨. (이유는 모르겠음)
            let cookieToken = Cookies.get('token');
            if (cookieToken) {
                // cookie에만 넣어놓으면 안되는 이유는, cookie는 세션이 다시 돌면 사라진다.
                // 즉 새로고침 하면 저장되어있던 token 정보가 사라지므로 다시 oms 화면으로 돌아가게 된다.
                sessionStorage.setItem('token', cookieToken);
                setRequestUserInfo(true);
            } else {
                window.location.href = OMS + OMS_CONTEXT.LOG_IN;
            }
        } else {
            // 개발 모드일 경우 그냥 token을 넣어둔다.
            sessionStorage.setItem('token', "token");
            localStorage.setItem('token', 'token');
        }
    }, []);

    const {data: userInfoRes} = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => fetchUserInfo(),
        enabled: requestUserInfo,
    })

    useEffect(() => {
        if (userInfoRes) {
            const userData = userInfoRes.data;
            if (userData) {
                setUserInfo(userData);
            } else {
                window.location.href = OMS + OMS_CONTEXT.OMS_VIEW;
            }
            setRequestUserInfo(false);
        }
    }, [userInfoRes])


    return (
        <>
            {
                <section className={"hwaseong"}>
                    <section className={"dashWrap"}>
                        <Topbar/>
                        <LeftMenu/>
                        <RightMenu/>
                        <GisArea/>
                    </section>
                </section>

            }
        </>

    )
}

export default Root