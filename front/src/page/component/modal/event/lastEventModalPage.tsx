import {useEffect, useState} from "react";
import {useLastEventStore} from "../../../data/store/zustand/lastEventStore";
import {useShallow} from "zustand/react/shallow";

const LastEventModalPage = () => {

    const {lastEventList, activePage,setActivePage} = useLastEventStore(useShallow((state)=>({
        lastEventList : state.lastEventList,
        activePage : state.activePage,
        setActivePage : state.actions.setActivePage
    })))

    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalPage, setTotalPage] = useState<number>(1);


    useEffect(()=>{
        if(lastEventList.length > 0){
            setTotalPage(Math.ceil(lastEventList.length / 10));
        }else{
            setTotalPage(1);
        }
    },[lastEventList])
    
    useEffect(()=>{
        if(activePage%10 === 1){
            let pageIndex = Math.floor(activePage / 10);
            let lastPage = pageIndex* 10 + 10;
            if(totalPage < lastPage){
                lastPage = totalPage;
            }
            
            let newPageList = [1];
            for(let i = activePage; i<lastPage; i++){
                if(!newPageList.includes(i)){
                    newPageList.push(i);
                }
            }
            setPageList(newPageList);
        } 
    },[activePage, totalPage])
    
    const handlePageBtn = (page : number) => {
        setActivePage(page);
    }

    const handleNextBtn = () => {
        if (activePage !== totalPage){
            setActivePage(activePage+1)
        }
    }

    const handleLastBtn = () => {
        if (activePage !== totalPage) {
            setActivePage(totalPage);
        }
    }

    const handlePrevBtn = () => {
        if (activePage !== 1) {
            setActivePage(activePage-1)
        }
    }

    const handleForeMostBtn = () => {
        if (activePage !== 1) {
            setActivePage(1);
        }
    }

    return (
        <div className={"last_event_list_paging_wrap"}>
            <ul className={'last_event_list_paging'}>
                <li>
                    <button className={`page fore_most ${activePage === 1 ? 'dimmed' : ''}`} onClick={handleForeMostBtn}></button>
                </li>
                <li>
                    <button className={`page prev ${activePage === 1 ? 'dimmed' : ''}`} onClick={handlePrevBtn}></button>
                </li>
                {
                    pageList.map((page) => (
                        <li>
                            <button className={`page ${page === activePage ? 'active' : ''}`}
                                    onClick={() => handlePageBtn(page)}>{page}</button>
                        </li>
                    ))
                }
                <li>
                    <button disabled={false} className={`page next ${activePage === totalPage ? 'dimmed' : ''}`} onClick={handleNextBtn}></button>
                </li>
                <li>
                    <button className={`page last ${activePage === totalPage ? 'dimmed' : ''}`} onClick={handleLastBtn}></button>
                </li>
            </ul>
        </div>
    )


}

export default LastEventModalPage