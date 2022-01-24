import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  let dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')])
    .then(all => {
      //console.log(all.data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
   })}, []);
   dailyAppointments = getAppointmentsForDay(state, state.day)
  const listOfA = dailyAppointments.map(item => {
    return (<Appointment
      key={item.id}
      id={item.id}
      time={item.time}
      interview={interview}
  />)})
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {listOfA}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
