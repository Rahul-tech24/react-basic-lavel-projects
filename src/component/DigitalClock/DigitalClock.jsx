import { useEffect, useState } from 'react';
import styles from './DigitalClock.module.css';

function DigitalClock(theme) {
  const [time, setTime] = useState(new Date());
  const [is24HourFormat, setIs24HourFormat] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  

  // 🕓 Extract pieces
  const hours = time.getHours();
  const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const day = daysOfWeek[time.getDay()];
    const month = monthsOfYear[time.getMonth()];
    const date = time.getDate();
    const year = time.getFullYear();
    const fullDate = `${day}, ${month} ${date}, ${year}`

  // 🌓 Determine AM/PM
  const isAM = hours < 12;
  const amPm = isAM ? 'AM' : 'PM';

  // ⏰ Format time
  const formattedHours = is24HourFormat
    ? hours.toString().padStart(2, '0')
    : ((hours % 12) || 12).toString().padStart(2, '0');

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const fullTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return (
    <div className={styles.clockContainer}>
      <div className={styles.timeRow}>
        <p className={styles.time}>{fullTime}</p>
        {!is24HourFormat && <span className={styles.amPm}>{amPm}</span>}
      </div>

      <button
        onClick={() => setIs24HourFormat(prev => !prev)}
        className={styles.toggleBtn}
      >
        Switch to {is24HourFormat ? '12' : '24'}-Hour Format
          </button>
   <p className={styles.date}>{fullDate}</p>
    </div>
  );
}

export default DigitalClock;