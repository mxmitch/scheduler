import React from "react";

import "components/DayListItem.scss";
import { tsPropertySignature } from "@babel/types";

import classNames from "classnames";

export default function DayListItem(props) {
  const formatSpots = function(spot) {
    if (spot > 1) {
      return spot + " spots remaining"
    } else if(spot === 1){
      return spot + " spot remaining"
    } else {
      return "no spots remaining"
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}