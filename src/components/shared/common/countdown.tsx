import { memo, useEffect, useState } from "react";

const Countdown = ({
  startTime,
  onDone,
}: {
  startTime: number;
  onDone: () => void;
}) => {
  const [time, setTime] = useState(startTime);
  console.log("render");
  useEffect(() => {
    let interval: NodeJS.Timer;

    const countDownUntilZero = () => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          onDone();
        }
        return prevTime - 1;
      });
    };

    interval = setInterval(countDownUntilZero, 1000);
    return () => clearInterval(interval);
  }, [onDone]);

  return <>{time}</>;
};
export default memo(Countdown);
