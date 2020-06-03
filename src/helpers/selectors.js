export const getAppointmentsForDay = (state, day) => {
  const dayObject = state.days.filter((one) => one.name === day)[0];

  if (dayObject) {
    const matchWithId = dayObject.appointments.map((x) => {
      return state.appointments[x];
    });
    return matchWithId;
  } else {
    return [];
  }
};

export const getInterviewersForDay = (state, day) => {
  const dayObject = state.days.filter((one) => one.name === day)[0];
  if (dayObject) {
    const matchWithId = dayObject.interviewers.map((x) => {
      return state.interviewers[x];
    });
    return matchWithId;
  } else {
    return [];
  }
};

export const getInterview = (state, interview) => {
  if (interview !== null) {
    let interviewObject = {};
    interviewObject["student"] = interview.student;
    interviewObject["interviewer"] = state.interviewers[interview.interviewer];
    return interviewObject;
  } else {
    return null;
  }
};

export const getSpotsForDay = (state, day) => {
  const dayObject = state.days.filter((one) => one.name === day)[0];
  let counter = 0;
  dayObject.appointments.forEach((x) => {
    if (state.appointments[x].interview) {
      counter++;
    }
  });
  return 5 - counter;
};
