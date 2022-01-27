import { useState } from "react";

export default function useVisualMode(modeInput) {
  const [mode, setMode] = useState(modeInput);
  const [history, setHistory] = useState([modeInput]);

  function transition(newMode, bool) {
    setMode(newMode);
    bool !== true && setHistory(prev => ([...prev, mode]));
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    return;
  }
  return { mode, transition, back };
}
