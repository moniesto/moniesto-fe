import { memo, useEffect, useState } from "react";

const Countdown = ({
  startTime,
  onDone,
}: {
  startTime: number;
  onDone: () => void;
}) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setTimeout(() => {
      if (time === 0) {
        onDone();
        return;
      }
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [time, onDone]);

  return <>{time}</>;
};
export default memo(Countdown);
