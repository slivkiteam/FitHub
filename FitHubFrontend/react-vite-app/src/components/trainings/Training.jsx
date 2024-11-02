import React from "react";
import { Link } from 'react-router-dom'

function Training({training}){
    return(
    <Link to={`/trains/${training.id}`}>
        <li className="training-card">
            <figure>
                <img className="training-img"/>
            </figure>
            <div className="training-type-box">
                <ul className="tag-list">
                    <li className="cardio-red"><a href="#">{training.category.category}</a></li>
                    <li className="fast"><a href="#">быстро</a></li>
                </ul>
            </div>
            <h3>{training.title}</h3>
            <p className="card-description">{training.description}</p>
        </li>
    </Link>)
}
export default Training;