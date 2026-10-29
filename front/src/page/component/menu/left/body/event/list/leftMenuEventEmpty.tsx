const LeftMenuEventEmpty = () => {

    return(
        <div className={"none_content"}>
            <div className={"no_event_icon"}/>
            <div className={"no_event_content"}>검색 조건의 오늘 발생한 재난 이벤트가 없습니다.</div>
            <div className={"no_event_sub_content"}>지난 이벤트 내역은 '지난 이벤트 내역'팝업을 통해 확인해주세요.</div>
        </div>
    )

}

export default LeftMenuEventEmpty