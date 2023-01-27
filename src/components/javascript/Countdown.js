import { useState, useEffect } from "react";

export default function Timer({ startMinutes }) {
  const startTime = startMinutes * 60; // convert minutes to seconds
  const [time, setTime] = useState(startTime);
  const [minutes, setMinutes] = useState(startMinutes);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => {
      if (time === 0) {
        clearInterval(timerID);
        setTime(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      setTime(time - 1);
      setMinutes(Math.floor((time - 1) / 60));
      setSeconds((time - 1) % 60);
    }, 1000);
    return () => clearInterval(timerID);
  }, [time]);

  return (
    <div style={{ textAlign: "center" }}>
      Please note that payment must be made in{" "}
      <span style={{ color: "red" }}>
        {minutes.toString().padStart(2, "0")}m:
        {seconds.toString().padStart(2, "0")}s
      </span>{" "}
      to avoid termination of the process
    </div>
  );
}
