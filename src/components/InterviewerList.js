  import React from "react";
  import InterviewerListItem from "./InterviewerListItem";
  import "components/InterviewerList.scss"
  import { tsPropertySignature } from "@babel/types";
  import PropTypes from 'prop-types';
  
  export default function InterviewerList(props) {
    const listOfInterviewers = props.interviewers.map(item => {
      return(<InterviewerListItem 
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={props.value === item.id}
      setInterviewer ={()=> {props.onChange(item.id)}}
        />
    )})
    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{listOfInterviewers}</ul>
      </section>
    )
  }
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

