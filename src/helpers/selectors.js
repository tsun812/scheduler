export function getAppointmentsForDay(state, day) {
  let res = [], days = [];
  state.days.forEach(item => {
    if (item.name === day){
      days = item.appointments;
    }
  })
  if (days.length === 0) {
    return [];
  }
  for (const [key, value] of Object.entries(state.appointments)) {
    if (days.includes(parseInt(key))) {
      res.push(value);
    }
  }
  return res;
}

export function getInterview(state, interview) {
  let res = {};
  if (interview === null) return null;
  for (const  [key, value] of Object.entries(state.interviewers)) {
    console.log(interview)
    if (value.id === interview.interviewer) {
      console.log(interview)
      res['student'] = interview.student;
      res['interviewer'] = value;
    }
  }
  return res;
  
}

export function getInterviewersForDay(state, day) {
  let res = [], days = [];
  state.days.forEach(item => {
    if (item.name === day){
      days = item.interviewers;
    }
  })
  if (days.length === 0) {
    return [];
  }
  for (const [key, value] of Object.entries(state.interviewers)) {
    if (days.includes(parseInt(value.id))) {
      res.push(value);
    }
  }
  return res;
}
  
