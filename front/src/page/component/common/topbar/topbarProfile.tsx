import React from "react";
import {useCommonStore} from "../../../data/store/zustand/commonStore";
import {API_CONTEXT, API_URL, isDev, OMS, OMS_CONTEXT} from "../../../conf/config/config";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import {useShallow} from "zustand/react/shallow";

const TopbarProfile = () => {


    const userInfo = useCommonStore((state)=> state.userInfo);
    const doLogOut = async () => {

        const token = localStorage.getItem("token") as string;

        if (token === '' || typeof token === 'undefined' || token == null || !isDev) {
            window.location.href = OMS;
        }
        const {data} = await axios.post(API_URL + API_CONTEXT.COMMON.LOG_OUT, null, {
            params: {token},
        });

        return data;
    }

    const logOutMutate = useMutation({
        mutationFn : () =>  doLogOut(),
        onSuccess : (data)=> {
            if(data){
                if(data === "FAIL"){
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    window.location.href = OMS + OMS_CONTEXT.LOG_IN;
                }else{
                    alert("로그아웃에 실패하였습니다.");
                }
            }else{
                alert("로그아웃에 실패하였습니다.");
            }
        },
        onError : error => {
            alert("로그아웃에 실패하였습니다.");
            console.log("logout failed: ", error)
        }
    })
    const handleLogOut = () => {
        isDev ?
            alert("로그아웃 시도중입니다") :
            logOutMutate.mutate();
    }

    return(
        <>
            <div className={"profile"}>
                <span className={"user"}><span>{userInfo ? userInfo.userName : '개발 관리자'}</span>님</span>
            </div>
            <button className={"logout_btn"} onClick={handleLogOut}>로그아웃</button>
        </>
    )

}

export default TopbarProfile