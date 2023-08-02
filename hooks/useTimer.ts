import {
  useState,
  useRef,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { Alert } from "@/util/Alert";

export function useTimer({
  timerStart,
  setShow,
}: {
  timerStart: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}): [string, string] {
  const MINUTES_IN_MS = 3 * 60 * 1000;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(1);
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    if (timerStart) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - INTERVAL);
      }, INTERVAL);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setTimeLeft(MINUTES_IN_MS);
        setShow(false);
        Alert.error("인증번호 유효시간이 초과되었습니다.");
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeLeft, timerStart]);

  return [minutes, second];
}
