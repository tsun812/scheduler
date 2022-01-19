import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"
export default function DayListItem(props) {
  const addClass = classNames("day-list__item", {"day-list__item--selected":props.selected, "day-list__item--full":props.spots===0})
  return (
    <li onClick={() => {props.setDay(props.name);}}>
      <h2 className={addClass}>Day {props.name}.</h2> 
      <h3 className={addClass}>{props.spots} spots remaining.</h3>
    </li>
  );
}