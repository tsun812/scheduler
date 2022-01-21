import React from "react";
import "components/Appointment/styles.scss"
export default function Appointment (props) {
  return(
    <article className="appointment">{props.time ? `appointment at ${props.time}` : "no appointment available"}</article>
  )
}