import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

function Training({training}){

    const categories = training.category.category.split(' ');

    // Обрезка описания до 40 символов
    const truncatedDescription = training.description.length > 40
        ? training.description.slice(0, 40) + "..."
        : training.description;
    

    return(
        <Link to={`/trains/${training.id}`}>
            <li className="training-card">
                <figure>
                    <img className="training-img" src='./src/img/negro_man.png' alt={training.title}/>
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
                <p className="card-description">{truncatedDescription}</p>
            </li>
        </Link>
    );
}

export default Training;
