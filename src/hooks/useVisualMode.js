import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      setHistory((prevHistory) => [
        ...prevHistory.slice(0, prevHistory.length - 1),
        newMode
      ]);
    } else {
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      const prevHistory = history.slice(0, history.length - 1);
      setMode(prevHistory[prevHistory.length - 1]);
      setHistory((prevHistory) => prevHistory.slice(0, history.length - 1));
    }
  }

  return { mode, transition, back };
}
