const EventLoad = (props:{isShow:boolean}) => {

    return(
        <div className={`table__wrap skeleton ${props.isShow ? '' : 'none'}`}>
            <table>
                <colgroup>
                    <col style={{ width: "182px" }}></col>
                    <col style={{ width: "250px" }}></col>
                    <col style={{ width: "182px" }}></col>
                    <col style={{ width: "636px" }}></col>
                </colgroup>
                <thead>
                <tr>
                    <th colSpan={4}>
                        <div></div>
                    </th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>
                        <div></div>
                    </td>
                    <td>
                        <div></div>
                    </td>
                    <td>
                        <div></div>
                    </td>
                    <td>
                        <div></div>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default EventLoad