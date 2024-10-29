import React from "react";
import { Link } from 'react-dom'

const Train = ({ train }) => {
  return (
    <li class="training-card">
      <Link to={`/trains/${train.id}`}>
        <figure>
          <img class="training-img"></img>
        </figure>
        <div class="training-type-box">
          <ul class="tag-list">
            <li class="cardio-red">
              <a href="#">{train.category}</a>
            </li>
            <li class="fast">
              <a href="#">{(train.durationInMinutes >= 15) ? "Быстро" : "Долго"}</a>
            </li>
          </ul>
        </div>
        <h3>{train.title}</h3>
        <p class="card-description">{train.author}. Описание тренировки</p>
      </Link>
    </li>
  );
};

export default Train;
