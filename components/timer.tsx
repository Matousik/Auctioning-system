/**
 * This component, Timer, calculates and displays the remaining time until a specified end date (typically the end of an auction event).
 * The remaining time is recalculated every second. If the timer has reached zero, a message "Čas vypršel!" is displayed instead of the time.
 * It uses the React 'useState' and 'useEffect' hooks for managing state and side effects respectively.
 * TODO: Implement functionality to disable further bids when the timer finishes.
 */

import { useEffect, useState } from 'react';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function Timer({ endDate }: { endDate: Date }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [timeLeft]); // Add timeLeft to the dependency array

  const timerIsFinished = !timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds;

  return (
    <div>
      {timerIsFinished ? "Čas vypršel!" : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </div>
  );
}

export default Timer;
