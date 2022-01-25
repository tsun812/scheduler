import { useState } from "react";

export default function useVisualMode(modeInput) {
  const [mode, setMode] = useState(modeInput);
  const [history, setHistory] = useState([modeInput]);

  function transition (newMode, bool) {
    setMode(newMode);
    bool !== true && setHistory([...history, newMode]);
  }
  function back () {
    (history.length > 1) && (history.pop(),setMode(history[history.length-1]));

  }
  return {mode, transition, back};
}
