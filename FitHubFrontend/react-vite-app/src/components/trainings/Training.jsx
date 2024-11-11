import React from "react";
import { Link } from 'react-router-dom'

function Training({training}){

    const categories = training.category.category.split(' ');

    return(
    <Link to={`/trains/${training.id}`}>
        <li className="training-card">
            <figure>
                <img className="training-img"/>
            </figure>
            <div className="training-type-box">
                <ul className="tag-list">
                {categories.map((category, index) => (
                    <li key={index} className='tag_red'>
                        <a href="#">{category}</a>
                    </li>
                ))}
            </ul>

            </div>
            <h3>{training.title}</h3>
            <p className="card-description">{training.description}</p>
        </li>
    </Link>)
}
export default Training;