import React, { useState, useEffect, setState } from "react";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment"
import DayList from "./DayList"
import { statement } from "@babel/template";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Mitch Lum",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Frederick Lee",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "5pm"
  }
];

export default function Application(props) {
  const [ day, setDay ] = useState("Monday");
  const [ days, setDays ] = useState([]);

  useEffect(() => {
    axios.get(`/api/days`)
      .then(res => {
        setDays(res.data)
      })
  }, []);
  
  const schedule = appointments.map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    );
  });

  return ( 
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >  
          <DayList
            days={days}
            day={day}
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