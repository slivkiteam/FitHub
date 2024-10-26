import React from "react";
import Train from "./train";

const Trainings = ({ data, currentPage, getAllContacts }) => {
  return (
    <div>
      {data?.content?.length === 0 && (
        <div>No Trains. Please add a new train</div>
      )}
      <ul class="search-and-cards">
        {data?.content?.length > 0 &&
          data.content.map((train) => <Train train={train} key={train.id} />)}
      </ul>
    </div>
  )
}

export default Trainings;
