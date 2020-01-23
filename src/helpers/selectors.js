import React from "react";

export default function getAppointmentsForDay(state, day) {
  //find object in state.days who's name matches the provided day
  //iterate thru the appointments array for the day where its id matches the id of states.appointment
  // if there are no appointments on a given day return an empty array
  console.log(state, day)
  const filteredAppointments = state.days.filter(one => one.name === day)
  
  const matchWithId = filteredAppointments[0].appointments.map(x => {
    const stateArray = Object.entries(state.appointments)
    stateArray.map(y => {
      return y[0] === x.toString()
    })
  })
  return matchWithId
};  
