import React from "react";
import { stat } from "fs";

export default function getAppointmentsForDay(state, day) {
  //find object in state.days who's name matches the provided day
  //iterate thru the appointments array for the day where its id matches the id of states.appointment
  // if there are no appointments on a given day return an empty array

  const dayObject = state.days.filter(one => one.name === day)[0];

  if (dayObject) {
    const matchWithId = dayObject.appointments.map(function(x) {
       return state.appointments[x]
    })
      return matchWithId
  } else {
      return [];
  }
};  


// export const getInterview = (state, interview) => {

// }


