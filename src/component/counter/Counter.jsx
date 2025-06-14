import { useEffect, useState } from "react";
import styles from './Counter.module.css';

function Counter({ theme }) {
  const [count, setCount] = useState(() => +localStorage.getItem("count") || 0);
  const [step, setStep] = useState(() => +localStorage.getItem("step") || 1);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });
  const [lastUpdated, setLastUpdated] = useState(() => localStorage.getItem("timestamp") || "Not updated yet");

  // Save individual states to localStorage
  useEffect(() => localStorage.setItem("count", count), [count]);
  useEffect(() => localStorage.setItem("step", step), [step]);
  useEffect(() => localStorage.setItem("history", JSON.stringify(history)), [history]);
  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setLastUpdated(time);
    localStorage.setItem("timestamp", time);
  }, [count, step, history]);

  function handleIncrement() {
    setHistory(prev => [...prev, count]);
    setCount(prev => prev + step);
  }

  function handleDecrement() {
    setHistory(prev => [...prev, count]);
    setCount(prev => prev - step);
  }

  function handleUndo() {
    setHistory(prev => {
      const newHistory = [...prev];
      const last = newHistory.pop();
      if (last !== undefined) setCount(last);
      return newHistory;
    });
  }

  function handleReset() {
    if (window.confirm("Are you sure you want to reset?")) {
      setCount(0);
      setHistory([]);
    }
  }

  // Count color logic
  const countColor =
    count > 0 ? styles.positive :
    count < 0 ? styles.negative :
    styles.neutral;

  return (
    <div className={`${styles.counter} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.change}>
        <button className={styles.increment} onClick={handleIncrement} disabled={count + step > 30}>Increment</button>
        {count === 30 && <p>You cannot go beyond limit 30</p>}
        <button className={styles.decrement} onClick={handleDecrement} disabled={count - step < -30}>Decrement</button>
        {count === -30 && <p>You cannot go below limit -30</p>}
        <button className={styles.reset} onClick={handleReset}>Reset</button>
      </div>

      <div className={styles.step}>
        <label htmlFor="step">Set Step: </label>
        <input
          type="number"
          id="step"
          value={step}
          min={1}
          onChange={e => setStep(+e.target.value)}
        />
      </div>

      <div className={`${styles.count} ${countColor}`}>{`Count: ${count}`}</div>
      <div className={styles.timestamp}>{`Last updated: ${lastUpdated}`}</div>

      <div className={styles.undo}>
        {history.length > 0
          ? <button onClick={handleUndo}>Undo</button>
          : <p>No history yet</p>}
      </div>

      <div className={styles.history}>
        <h3>History:</h3>
        <ul>
          {history.map((item, i) => (<li key={i}>{item}</li>))}
        </ul>
      </div>
    </div>
  );
}

export default Counter;
