import LeftMenuEvent from "./event/leftMenuEvent";
import LeftMenuCctv from "./cctv/leftMenuCctv";
import LeftMenuLegend from "./legend/leftMenuLegend";

const LeftMenuBody = () => {


    return (
        <div className={"dashboard_body"}>

            <LeftMenuEvent/>
            <LeftMenuCctv/>
            <LeftMenuLegend/>

        </div>
    )

}

export default LeftMenuBody