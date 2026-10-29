import * as XLSX from "xlsx-js-style";
import {useStatStore} from "../../../../../data/store/zustand/statStore";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchExcelEventList} from "../../../../../data/api/event/eventApis";
import {
    BODT_STYLE,
    HEADER_STYLE,
    STAT_EVENT_TYPE_LIST,
    STAT_TYPE,
    TITLE_STYLE
} from "../../../../../conf/const/stat/statConst";
import moment from "moment";
import {MODAL_TYPE} from "../../../../../conf/const/common/commonConst";
import {useCommonStore} from "../../../../../data/store/zustand/commonStore";


const ExcelBtn = () => {

    const activeModal = useCommonStore((state)=> state.activeModal);
    const {startDtm, endDtm, activeType, isExcelRequest, setIsExcelRequest,} = useStatStore(useShallow((state) => ({
        startDtm: state.startDtm,
        endDtm: state.endDtm,
        activeType: state.activeType,
        isExcelRequest : state.isExcelRequest,
        setIsExcelRequest : state.actions.setIsExcelRequest
    })))

    const headerList = ["", "발생 일시", "이벤트 타입",  "발생 지역", "발생 장소", "이벤트 내용"];
    const [param, setParam] = useState<{ eventType: string, startDtm: string, endDtm: string } | null>(null);
    const [excelBodyList, setExcelBodyList] = useState< { s: { alignment: { horizontal: string, vertical: string }, font: { sz: string, bold: boolean } }, t: string, v: string }[][]>([]);

    const {data: excelRes} = useQuery({
        queryKey: ['excelList'],
        queryFn: () => fetchExcelEventList(param),
        enabled: isExcelRequest !== "none" && activeModal === MODAL_TYPE.STAT
    })


    useEffect(()=>{
        if(activeModal === MODAL_TYPE.STAT){
            const dateType = activeType.split("_")[0];
            const eventType = activeType.split("_")[1];
            let newParam = {...param, eventType : eventType};
            if(dateType === STAT_TYPE.DATE){
                newParam = {...newParam, startDtm: startDtm, endDtm:endDtm};
            }else if(dateType === STAT_TYPE.MONTH){
                newParam = {...newParam, startDtm: moment().format("YYYYMM"+"01"), endDtm : moment().format("YYYYMMDD")}
            }else{
                newParam = {...newParam, startDtm: moment().subtract(1,'weeks').format("YYYYMMDD"), endDtm : moment().format("YYYYMMDD")}
            }
            setParam(newParam);
        }else{
            setParam({startDtm: moment().subtract(1,'weeks').format("YYYYMMDD"), endDtm : moment().format("YYYYMMDD"), eventType : "FFT"})
        }
    },[activeType])

    useEffect(() => {
        if(activeModal === MODAL_TYPE.STAT){
            if(isExcelRequest !== "none"){
                if(excelRes){
                    alert("엑셀 다운로드를 시작합니다.");
                    const excelList = excelRes.data;
                    if(excelList.length > 0){
                        let bodies: { s: { alignment: { horizontal: string, vertical: string }, font: { sz: string, bold: boolean } }, t: string, v: string }[][] = []
                        excelRes.data.map((item, index) => {
                            let body: { s: { alignment: { horizontal: string, vertical: string }, font: { sz: string, bold: boolean } }, t: string, v: string }[] = [];

                            headerList.forEach((order) => {
                                body.push(setBody(order, "s"));
                            })
                            let bodyItem: { s: { alignment: { horizontal: string, vertical: string }, font: { sz: string, bold: boolean } }, t: string, v: string }[] = [];

                            bodyItem.push(setBody((index + 1).toString(), "s"));
                            bodyItem.push(setBody(moment(item.outbDtm, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"), "s"));
                            bodyItem.push(setBody(item.eventNm,"s"));
                            bodyItem.push(setBody(item.znNm, "s"));
                            bodyItem.push(setBody(item.addr, "s"));
                            bodyItem.push(setBody(item.cntn, "s"));
                            bodies.push(bodyItem);
                        })

                        setExcelBodyList(bodies);
                    }else{
                        setExcelBodyList([]);
                        alert("엑셀 다운로드를 실패하였습니다.");

                    }
                }else{
                    setExcelBodyList([]);
                    alert("엑셀 다운로드를 실패하였습니다.");
                }
                setIsExcelRequest("none");
            }
            setIsExcelRequest("none");
        }
        setIsExcelRequest("none");
    }, [excelRes])

    useEffect(()=>{
        if(activeModal=== MODAL_TYPE.STAT){
            if(excelBodyList.length > 0 && isExcelRequest === "none"){
                const eventType = STAT_EVENT_TYPE_LIST.filter((item)=> item.cd === activeType.split("_")[1])[0].nm;
                // @ts-ignore
                const wb = XLSX.utils.book_new();
                const title = [{
                    v: `  화성시 ${eventType} 리스트 (${excelRes.data.length.toLocaleString()})`,
                    t: "s",
                    s: {...TITLE_STYLE, alignment: {horizontal: "left"}}
                }]

                const header = headerList.map((headerItem) => setHeader(headerItem, "s"));
                let body = [];
                body.push(header);
                body.push(...excelBodyList);

                // @ts-ignore
                const ws = XLSX.utils.aoa_to_sheet([title, ...body]);
                const header_width_list = headerList.map((_,index) => (index===0 ? {wch: 20} : {wch: 40}))
                const body_width_list = excelBodyList.map((_) => ({hpx: 20}))
                ws["!cols"] = [...header_width_list];
                ws["!rows"] = [{hpx: 30}, {hpx: 30}, ...body_width_list];
                ws["!merges"] = [{s: {r: 0, c: 0}, e: {r: 0, c: headerList.length - 1}}];
                // @ts-ignore
                XLSX.utils.book_append_sheet(wb, ws, `이벤트 리스트 이력`);

                XLSX.writeFile(wb, `${setDateType()}_${eventType}_${moment().format('YYYYMMDD')}.xlsx`, {bookType: "xlsx"});
            }
        }

    },[excelBodyList])

    const setDateType = () => {
        const dateType = activeType.split("_")[0];
        if (dateType === STAT_TYPE.DATE) {
            return '기간별'
        } else if (dateType === STAT_TYPE.MONTH) {
            return '월별'
        } else {
            return '최근 7일'
        }
    }


    const setBody = (nm: string, type: string): { s: { alignment: { horizontal: string, vertical: string }, font: { sz: string, bold: boolean } }, t: string, v: string } => {
        return {
            v: nm,
            t: type,
            s: {...BODT_STYLE}
        }
    }

    const setHeader = (nm: string, type: string) => {
        return {
            v: nm,
            t: type,
            s: {...HEADER_STYLE}
        }
    }

    return null;

}

export default ExcelBtn