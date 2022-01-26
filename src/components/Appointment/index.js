import "components/Appointment/styles.scss"
import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import { Fragment } from "react";
export default function Appointment (props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer: interviewer
  };
  transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(() => {transition(SHOW);})
  
}

function deleteA() {
  transition(DELETING);
  props.cancelInterview(props.id)
  .then(() => {transition(EMPTY);})
  }

function edit() {
    transition(EDIT);
}
  
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete = {() => deleteA()}
            onEdit = {edit}
          />
        )
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>{back()}} onSave={save} />}
      {mode === SAVING && <Status message={'SAVING'} />}
      {mode ===  DELETING&& <Status message={'DELETING'} />}
      {mode ===  EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer} onCancel={()=>{back()}} onSave={save} />}
      </article>
  )
}

