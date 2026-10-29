import StatBodyLeft from "./left/statBodyLeft";
import StatBodyRight from "./right/statBodyRight";
import ExcelBtn from "./excel/excelBtn";

const StatBody = () => {

    return(
        <div className="stat_modal__body">
            <StatBodyLeft/>
            <StatBodyRight/>
            <ExcelBtn/>
        </div>
    )


}

export default StatBody