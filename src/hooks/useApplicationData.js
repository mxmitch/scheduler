import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useVisualMode(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`http://localhost:5000/api/appointments/${id}`, {
        interview
      })
      .then(() => {
        setState({ ...state, appointments });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function cancelInterview(id, interview) {
    console.log(id, interview);

    return axios
      .delete(`http://localhost:5000/api/appointments/${id}`, {
        interview
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const daysAPI = axios.get("http://localhost:5000/api/days");
    const appointmentsAPI = axios.get("http://localhost:5000/api/appointments");
    const interviewersAPI = axios.get("http://localhost:5000/api/interviewers");

    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then(res => {
      setState({
        ...state,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
