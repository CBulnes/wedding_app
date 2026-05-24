import { useEffect, useState } from "react";

import styles from "./Countdown.module.css";

function Countdown() {

  const weddingDate =
    new Date("2026-10-24T00:00:00");

  const [timeLeft, setTimeLeft] =
    useState(getTimeLeft());

  function getTimeLeft() {

    const now = new Date();

    const difference =
      weddingDate - now;

    const days =
      Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (difference / (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (difference / 1000) % 60
      );

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTimeLeft(getTimeLeft());

      }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className={styles.countdown}>

      <div>
        <span>{timeLeft.days}</span>
        <p>Días</p>
      </div>

      <div>
        <span>{timeLeft.hours}</span>
        <p>Horas</p>
      </div>

      <div>
        <span>{timeLeft.minutes}</span>
        <p>Min</p>
      </div>

      <div>
        <span>{timeLeft.seconds}</span>
        <p>Seg</p>
      </div>

    </div>
  );
}

export default Countdown;