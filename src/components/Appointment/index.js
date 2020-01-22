import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/styles.scss";


export default function Appointment(props) {
  if(props.interview) {
    return (
      <article className="appointment">
        <Header 
          time={props.time}
          />
        <Show
          student={props.interview['student']}
          interviewer={props.interview.interviewer.name}
          onEdit={props.onEdit}
          onSave={props.onSave}
        />
      </article>
    )
  } else {
    return (
      <article className="appointment">
        <Header 
          time={props.time}/>
        <Empty 
          onAdd={props.onAdd}
        />
      </article>
    )
  }  
}

