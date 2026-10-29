import {useState} from "react";
import LeftMenuHeader from "./leftMenuHeader";
import LeftMenuBody from "./body/leftMenuBody";
import LastEventModal from "../../modal/event/lastEventModal";
import StatModal from "../../modal/stat/statModal";

const LeftMenu = () => {

    const [leftPanelOpen, setLeftPanelOpen] = useState<boolean>(true);
     return (
         <section className={`dashboard_container ${leftPanelOpen ? '' : 'close'}`}>
         {/*<section className={`dashboard_container close`}>*/}
             <button type={"button"}
                     className={"tab_btn"}
                     disabled={false}
                     onClick={()=> setLeftPanelOpen(!leftPanelOpen)}
             />
             <LeftMenuHeader/>
             <LeftMenuBody/>
             <LastEventModal/>
             <StatModal/>
         </section>
     )
}

export default LeftMenu