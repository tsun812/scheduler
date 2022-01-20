import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"
export default function InterviewerListItem(props){
  const addClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})
  const addClassImage = classNames("interviewers__item-image", {"interviewers__item--selected-image": props.selected})
  return(<li className={addClass} onClick={()=>{props.setInterviewer(props.id)}}>
  <img
    className={addClassImage}
    src={props.avatar}
    alt={props.name}
  />
  {props.selected ? props.name : undefined}
</li>
  )
}