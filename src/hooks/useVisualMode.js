import React, { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(newMode, replace) { 
    if (!replace || replace === false) {
      setMode(newMode)
      history.push(newMode)
    } else {
      history.splice(history.length - 1, 1 ,newMode)
      setMode(history[history.length-1]);
    }
  }
  
  function back() {
    if (history.length >= 2) { 
      history.pop(); 
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0])
    }
  }

  return { mode, transition, back };
};