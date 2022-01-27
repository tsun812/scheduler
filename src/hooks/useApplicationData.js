import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function useApplicationData(modeInput) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  
  function bookInterview(id, interview) {
    console.log(id, interview);
    console.log(state);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((res) => {
        console.log(res)
        if (res.status === 204) {
          // const spot = getSpotsForDay();
          // console.log(spot);
          
          setState({ ...state, appointments });
        }
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
     
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        console.log(state)
        if (res.status === 204) {
          let spot = getSpotsForDay();
          console.log(spot);
          spot++;
          console.log(spot);
          let dayObj = getDayObj();
          const newday = {
            ...dayObj,
            spots: spot,
          };
          console.log(dayObj);
          console.log(newday)
         
          let newdays = state.days.map(d => d.name === state.day ? newday : d);
          console.log(state.days)
          setState({ ...state, appointments, days: newdays});
          console.log(state)
        }
      });
  }

  function getSpotsForDay() {
    let spot = null;
    state.days.forEach(item => {
      if (item.name === state.day){
        spot = item.spots;
      }
    }) 
    return spot;
  }
  function getDayObj() {
    let res = {};
    state.days.forEach(item => {
      if (item.name === state.day){
        res = item;
      }
    }) 
    return res;
  }
  return { state, setDay, bookInterview, cancelInterview };
}
