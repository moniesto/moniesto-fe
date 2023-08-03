import { memo, useEffect, useMemo, useState } from "react";

const Countdown = ({
  startTime,
  onDone,
}: {
  startTime: number;
  onDone: () => void;
}) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    if (time < 1) {
      onDone();
      return;
    }
    const timeOut = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [onDone, time]);

  const formatTimer = useMemo(() => {
    let minutes = (time / 60) | 0;
    let seconds = time % 60 | 0;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }, [time]);

  return <>{formatTimer}</>;
};
export default memo(Countdown);
