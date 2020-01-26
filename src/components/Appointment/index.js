import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "STATUS";
  const DELETING = "STATUS";
  // const CONFIRM = "CONFIRM";
  // const ERROR = "ERROR";
  // const FORM = "FORM";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        console.log(error);
      });
  }

  // function remove(props.student, interviewer) {
  //   const interview = null;
  //   transition(DELETING);

  //   props
  //     .cancelInterview(props.id, interview)
  //     .then(() => transition(EMPTY))
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          // onDelete={remove}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {/* {mode === DELETING && <Status message="Deleting..." />} */}
    </article>
  );
}
