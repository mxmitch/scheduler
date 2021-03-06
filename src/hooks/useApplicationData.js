import { useReducer, useEffect } from "react";
import axios from "axios";
import { getSpotsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  useEffect(() => {
    const daysAPI = axios.get("/api/days");
    const appointmentsAPI = axios.get("/api/appointments");
    const interviewersAPI = axios.get("/api/interviewers");

    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then((res) => {
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

        const updatedState = {
          ...state,
          appointments
        };

        return {
          ...updatedState,
          days: state.days.map((day) => ({
            ...day,
            spots: getSpotsForDay(updatedState, day.name)
          }))
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
      .put(`/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview(id, interview) {
    return axios
      .delete(`/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
