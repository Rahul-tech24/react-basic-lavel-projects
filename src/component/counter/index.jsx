import { useEffect, useState } from "react";
import "./styles.css"



function Counter() {
    const [count, setCount] =  useState(() => {
        const saved = localStorage.getItem("count");
        return saved ? +saved : 0;
    });
    const [step, setStep] = useState(() => {
        const stepSaved = localStorage.getItem("step");
        return stepSaved ? + stepSaved : 1;
    });
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("history");
        return saved ? JSON.parse(saved) : [];
    });
    const [lastUpdated, setLastUpdated] = useState(() => {
        return localStorage.getItem("timestamp") || "Not updated yet";
      });
    

    function handleIncrement() {
        setHistory(prev => [...prev, count]);
        setCount(prev => prev + step);
    }
    
    function handleUndo() {
        setHistory(prevHistory => {
          const newHistory = [...prevHistory];
          const last = newHistory.pop();
          if (last !== undefined ) {
            setCount(last);
          }
          return newHistory;
        });
    }
    
    function handleDecrement() {
        setHistory(prev => [...prev, count]);
        setCount(prev => prev - step);
    }

    function handleReset() {
        const confirmReset = window.confirm("Are you sure you want to reset?");
        if (confirmReset) {
          setCount(0);
          setHistory([]);
        }
      }
    
    useEffect(() => {
           const time = new Date().toLocaleTimeString();
            setLastUpdated(time);
          localStorage.setItem("timestamp", time);
          localStorage.setItem("count", count);
          localStorage.setItem("step", step);
          localStorage.setItem("history", JSON.stringify(history));
      }, [count, step, history]);
      
     
   
    return (
        
        <div className="counter">
            <div className="change">
                <button onClick={handleIncrement} disabled={count=== 30} >Increment</button>
                {(count===30) && <p>you can not go beyond limit 30</p> }
                <button onClick={handleDecrement} disabled={count === -30} >Decreement</button>
                {(count=== -30) && <p>you can not go below limit -30</p> }
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="step">
                <label htmlFor="step">Set Step : </label>
                <input type="number" id="step" value={step} min={1} onChange={e => setStep(+e.target.value)} /> 
            </div>
            

            <div className="count" >{`count: ${count}`}</div>
            <div className="timestamp">{`last Updated time : ${lastUpdated}`}</div>
            <div className="undo">
                {history.length > 0 ?
                    (<button onClick={handleUndo}>undo</button>) :
                    (<p>there is no history</p>)}
            </div>
            <div className="history">
                <h3>History:</h3>
                <ul>
                    {history.map((item, i) => (<li key={i}>{item}</li>))}
                </ul>
            </div>
    </div>
    )
};

export default Counter;