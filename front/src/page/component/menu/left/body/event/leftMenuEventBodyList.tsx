import React from "react";
import LeftMenuEventResult from "./list/leftMenuEventResult";

const LeftMenuEventBodyList = () => {

    return (
        <>
            <div className={"event_list_frame"}>
                <ul className="event_list_header">
                    <li>이벤트</li>
                    <li>위치</li>
                    <li>발생 일시</li>
                </ul>
                <LeftMenuEventResult/>
            </div>
        </>

    )


}

export default LeftMenuEventBodyList