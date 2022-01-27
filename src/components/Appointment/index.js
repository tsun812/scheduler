import "components/Appointment/styles.scss"
import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import { Fragment } from "react";
export default function Appointment (props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
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
  .catch(() => {transition(ERROR_SAVE, true);})
  
}

function deleteA() {
  transition(DELETING, true);
  props.cancelInterview(props.id)
  .then(() => {transition(EMPTY);})
  .catch(() => {transition(ERROR_DELETE, true);})
  }
function confirm () {
  transition(CONFIRM);
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
            onDelete = {() => confirm()}
            onEdit = {edit}
          />
        )
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>{back()}} onSave={save} />}
      {mode === SAVING && <Status message={'SAVING'} />}
      {mode === DELETING && <Status message={'DELETING'} />}
      {mode === CONFIRM && <Confirm message={'DELETING'} onCancel={()=>{back()}} onConfirm={()=>deleteA()}/>}
      {mode ===  EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer} onCancel={()=>{back()}} onSave={save} />}
      {mode === ERROR_DELETE && <Error message={'Cannot delete appointment'} onClose={()=>{back()}}/>}
      {mode === ERROR_SAVE && <Error message={'Cannot save appointment'} onClose={()=>{back()}}/>}
      </article>
  )
}

