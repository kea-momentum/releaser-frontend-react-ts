import { useState, useRef, useEffect, RefObject } from "react";

export function useTimer(TimerStart: boolean): [string, string] {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(1);
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    if (TimerStart) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - INTERVAL);
      }, INTERVAL);

      if (timeLeft <= 0) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeLeft, TimerStart]);

  return [minutes, second];
}
