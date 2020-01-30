import React from "react";

export const getAppointmentsForDay = (state, day) => {
  const dayObject = state.days.filter(one => one.name === day)[0];

  if (dayObject) {
    const matchWithId = dayObject.appointments.map(function(x) {
      return state.appointments[x];
    });
    return matchWithId;
  } else {
    return [];
  }
};

export const getInterviewersForDay = (state, day) => {
  const dayObject = state.days.filter(one => one.name === day)[0];
  if (dayObject) {
    const matchWithId = dayObject.interviewers.map(function(x) {
      return state.interviewers[x];
    });
    return matchWithId;
  } else {
    return [];
  }
};

export const getInterview = (state, interview) => {
  if (interview !== null) {
    let newObject = {};
    newObject["student"] = interview.student;
    newObject["interviewer"] = state.interviewers[interview.interviewer];
    return newObject;
  } else {
    return null;
  }
};

export const getSpotsforDay = (state, day) => {
  const dayObject = state.days.filter(one => one.name === day)[0];
  let counter = 0;
  dayObject.appointments.forEach(x => {
    if (state.appointments[x].interview) {
      counter++;
    }
  });
  console.log(day, state, counter);
  return 5 - counter;
};
