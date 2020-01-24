import React, { useEffect, setState, useState } from "react"
import axios from "axios"
import "components/Application.scss"
import Appointment from "components/Appointment"
import DayList from "./DayList"
import { getAppointmentsForDay, getInterview } from "../helpers/selectors"



export default function Application() {
  const [ state, setState ] = useState({ day: "Monday", days: [], appointments: [], interviewers: {} });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {    
    const promise1 = axios.get("http://localhost:5000/api/days");
    const promise2 = axios.get("http://localhost:5000/api/appointments");
    const promise3 = axios.get("http://localhost:5000/api/interviewers");
    
    Promise.all([promise1, promise2, promise3]).then((res) => {
      setState({ ...state, days: res[0].data, appointments: res[1].data, interviewers: res[2].data 
      });
    })
  }, []); 

  const newAppointments = getAppointmentsForDay(state, state.day);

  const schedule = newAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  });

  return ( 
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >  
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt= "Lighthouse Labs" />
      </section>
      <section className="schedule"> 
          {schedule}
      </section>
    </main >
  );
}