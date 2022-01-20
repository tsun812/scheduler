import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItems = props.days.map(item => {
      return (<DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots} 
      selected={item.name === props.day}
      setDay={(event) => {props.setDay(item.name)}}
    />)
    });
  return (
    <ul>{listItems}</ul>
  );
}
