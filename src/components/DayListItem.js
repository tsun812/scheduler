import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"
function formatSpots(props) {
  console.log(props.spots)
  if (props.spots === 0){
    return "no spots remaining"
  }
  else if (props.spots === 1){
    return "1 spot remaining"
  }
  else if (props.spots > 1){
    return `${props.spots} spots remaining`
  }
}
export default function DayListItem(props) {
  const addClass = classNames("day-list__item", {"day-list__item--selected":props.selected, "day-list__item--full":props.spots===0})
  const formatS = formatSpots(props);
  return (
    <li onClick={props.setDay}>
      <h2 className={addClass}>Day {props.name}.</h2> 
      <h3 className={addClass}>{formatS}</h3>
    </li>
  );
}
