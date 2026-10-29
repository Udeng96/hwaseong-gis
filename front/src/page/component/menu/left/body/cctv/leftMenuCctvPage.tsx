import {useEffect, useState} from "react";
import {useShallow} from "zustand/react/shallow";
import {useCctvStore} from "../../../../../data/store/zustand/cctvStore";

const LeftMenuCctvPage = () => {

    const {cctvList, activePage, setActivePage} = useCctvStore(useShallow((state)=> ({
        cctvList : state.cctvList,
        activePage : state.activePage,
        setActivePage : state.actions.setActivePage
    })))

    const [cctvPageList, setCctvPageList] = useState<number[]>([1]);
    const [cctvTotalPage, setCctvTotalPage] = useState<number>(1);

    useEffect(()=>{
        if(cctvList.length > 0){
            setCctvTotalPage(Math.ceil(cctvList.length / 10))
        }else{
            setCctvTotalPage(1);
        }
    },[cctvList])

    useEffect(()=>{
        if(activePage%10 === 1){
            let pageIndex = Math.floor(activePage / 10);
            let lastPage = pageIndex*10+10;
            if(cctvTotalPage < lastPage){
                lastPage = cctvTotalPage;
            }
            let newPageList = [];
            for(let i = activePage; i<=lastPage; i++){
                newPageList.push(i);
            }
            setCctvPageList(newPageList);
        }
    },[activePage, cctvTotalPage])

    const handlePageBtn = (page : number) => {
        setActivePage(page);
    }

    const handleNextBtn = () => {
        if (activePage !== cctvTotalPage){
            setActivePage(activePage+1);
        }
    }

    const handleLastBtn = () => {
        if (activePage !== cctvTotalPage) {
            setActivePage(cctvTotalPage);
        }
    }

    const handlePrevBtn = () => {
        if (activePage !== 1) {
            setActivePage(activePage-1);
        }
    }

    const handleForeMostBtn = () => {
        if (activePage !== 1) {
            setActivePage(1);
        }
    }

    return (
        <div className={"cctv_paging_wrap"}>
            <ul className={"cctv_list_paging"}>
                <li><button className={`page fore_most ${activePage === 1 ? 'dimmed' : ''}`}
                       onClick={handleForeMostBtn}/></li>
                <li><button className={`page prev ${activePage === 1 ? 'dimmed' : ''}  `}
                       onClick={handlePrevBtn}/></li>
                {
                    cctvPageList.map((page)=>(
                        <li><button className={`page ${activePage === page ? 'active' : ''}`} onClick={()=>handlePageBtn(page)}>{page}</button></li>
                    ))
                }
                <li><button className={`page next ${activePage === cctvTotalPage ? 'dimmed' : ''}`}
                       onClick={handleNextBtn}/></li>
                <li><button className={`page last ${activePage === cctvTotalPage ? 'dimmed' : ''}`}
                       onClick={handleLastBtn}/></li>
            </ul>
        </div>

    )

}

export default LeftMenuCctvPage