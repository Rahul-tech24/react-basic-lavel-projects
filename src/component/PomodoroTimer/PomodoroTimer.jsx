import { useEffect, useState } from "react";
import styles from "./Pomodoro.module.css"

function Pomodoro({theme}) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [progress, setProgress] = useState();
    
    function handleSetTime() {
        const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
        
        setTimeLeft(totalSeconds);
        setProgress(100);
      }
   
    useEffect(() => {
        if (!running) return; 
      
        const intervalId = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
                setRunning(false);
                new Audio('/public/heart_touching.mp3').play();
                setProgress(0);
              clearInterval(intervalId);
              return 0;
              }
              const newTime = prev - 1;
              const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
              const newProgress = (newTime / totalSeconds) * 100;
              setProgress(newProgress);
            return newTime ;
          });
        }, 1000);
      
        return () => clearInterval(intervalId);
      }, [running]); 
      
    function handleStartPause() {
        setRunning(prev => !prev);
    }
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

   
    return (
        <div className={styles.pomodoro} >
            <div className={styles.progress}>
                <div className={styles.bar} style={{ width: `${progress}%` }}></div>
            </div>
            <h1>{String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</h1>
         <div className={styles.timer}> 
            <label htmlFor="hours">Set Hours</label>
               <input
                    type="number"
                    id="hours"
                    min="0"
                   value={inputHours}
                   disabled = {running}
                onChange={e => setInputHours(Number(e.target.value))}
                />
            <label htmlFor="minutes">Set Minutes</label>
               <input
                    type="number"
                    id="minutes"
                    min="0"
                   value={inputMinutes}
                   disabled = {running}
                onChange={e => setInputMinutes(Number(e.target.value))}
                />
              <label htmlFor="Seconds">Set Seconds</label>
               <input
                    type="number"
                    id="Seconds"
                    min="0"
                   value={inputSeconds}
                   disabled = {running}
                onChange={e => setInputSeconds(Number(e.target.value))}
                />        
        </div>
           <button onClick={handleSetTime} disabled = {(inputHours===0 && inputMinutes===0 && inputSeconds===0) || (running===true)}  >Set timer</button>
            
           {running && <button onClick={handleStartPause} >stop</button> }
        
            {!running && <button onClick={handleStartPause} disabled={timeLeft === 0} >start</button>}
            <button onClick={() => {
                   setTimeLeft(0);
                setRunning(false);
                setInputHours(0);
                setInputMinutes(0);
                setInputSeconds(0);
                    }}>Reset</button>
        </div>
    )
}
export default Pomodoro;