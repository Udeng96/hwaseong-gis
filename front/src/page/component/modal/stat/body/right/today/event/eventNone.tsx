const EventNone = (props:{isShow: boolean}) => {


    return(
        <div className={`table__wrap noData  ${ props.isShow? '' :'none'}`}>
            <i></i>
            <p>금일 소방서 이벤트가 없습니다. <br/>다른 기관 이벤트를 확인해보세요.</p>
        </div>
    )

}

export default EventNone