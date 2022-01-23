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