import LeftMenuCctvList from "./leftMenuCctvList.tsx";
import LeftMenuCctvPage from "./leftMenuCctvPage.tsx";

const LeftMenuCctvBodyList = () => {

    return (
        <>
            <div className={"cctv_list_frame"}>
                <ul className={"cctv_list_header"}>
                    <li>NO.</li>
                    <li>CCTV 종류</li>
                    <li>CCTV명</li>
                </ul>
                <LeftMenuCctvList/>
                <LeftMenuCctvPage/>

            </div>
        </>


    )

}
export default LeftMenuCctvBodyList