import React, { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  useEffect(() => {
    const daysAPI = axios.get("http://localhost:5000/api/days");
    const appointmentsAPI = axios.get("http://localhost:5000/api/appointments");
    const interviewersAPI = axios.get("http://localhost:5000/api/interviewers");

    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then(res => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      });
    });
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        //check if interview is null
        //find day through appoitment id
        // add one to spots if null/ subtract one from spots if not null
        const findDay = id => {
          if (id >= 1 && id <= 5) {
            return 0;
          } else if (id >= 6 && id <= 10) {
            return 1;
          } else if (id >= 11 && id <= 15) {
            return 2;
          } else if (id >= 16 && id <= 20) {
            return 3;
          } else {
            return 4;
          }
        };

        console.log(findDay(action.id));

        if (appointment.interview === null) {
          state.days[findDay(action.id)].spots =
            state.days[findDay(action.id)].spots - 1;
        } else {
          state.days[findDay(action.id)].spots =
            state.days[findDay(action.id)].spots + 1;
        }

        return {
          ...state,
          appointments
        };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  function setDay(day) {
    dispatch({ type: SET_DAY, day });
  }

  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:5000/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview(id, interview) {
    return axios
      .delete(`http://localhost:5000/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
