import {EventType} from "../../../../../../../conf/interface/stat/statInterface";
import moment from "moment";

const EventList = (props:{isShow: boolean, eventList: EventType[]}) => {

    return(
        <div className={`table__wrap ${props.isShow ? '' :'none'}`} >
            <table>
                <colgroup>
                    <col style={{ width: "182px" }}></col>
                    <col style={{ width: "250px" }}></col>
                    <col style={{ width: "182px" }}></col>
                    <col style={{ width: "636px" }}></col>
                </colgroup>
                <thead>
                <tr>
                    <th>날짜</th>
                    <th>지역</th>
                    <th>이벤트 유형</th>
                    <th>이벤트 상세</th>
                </tr>
                </thead>

                <tbody>
                {
                    props.isShow&&
                    props.eventList.map((item)=>(
                        <tr>
                            <td>{moment(item.outbDtm.substring(0,14), 'YYYYMMDDHHmmss').format("YY-MM-DD HH:mm:ss")}</td>
                            <td>{item.addr}</td>
                            <td>{item.eventNm}</td>
                            <td>{item.cntn}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default EventList