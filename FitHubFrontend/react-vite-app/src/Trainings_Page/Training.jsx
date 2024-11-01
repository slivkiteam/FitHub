function Training(props){
    const { title, id, description, types } = props
    return(
    <>
    <li className="training-card">
        <figure>
            <img className="training-img"></img>
        </figure>
        <div className="training-type-box">
            <ul className="tag-list">
                <li className="cardio-red"><a href="#">силовая</a></li>
                <li className="fast"><a href="#">быстро</a></li>
            </ul>
        </div>
        <h3>{title}</h3>
        <p className="card-description">Описание тренировки</p>
    </li>
    </>)
}

export default Training;