import React from "react";
import Station from "./Station";

function List(props) {
  const station = props.station;
  return (
    <div>
      {station.map(({ id, ...station }) => {
        return <Station key={id} {...station} />;
      })}
    </div>
  );
}

export default List;
