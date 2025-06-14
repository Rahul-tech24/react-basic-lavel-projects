import { useState, useEffect } from 'react'
import Counter from './component/counter/Counter'
import './App.css'
import ThemeToggle from './component/ThemeToggle/ThemeToggle'
import FormInputTracker from './component/formInputTracker/FormInputTracker'

function App() {

   const [formSubmitted, setFormSubmitted] = useState(false);
   const [theme, setTheme] = useState(() => {
              const savedTheme = localStorage.getItem("theme");
              const systemPrefersDark = window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
              return savedTheme ? savedTheme : (systemPrefersDark.matches ? "dark" : "light");
          });
          useEffect(() => {
            document.body.classList.remove("light", "dark");
            document.body.classList.add(theme);
              localStorage.setItem("theme", theme);
          }, [theme]);
      
  
  return (
    <div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      {!formSubmitted ? <FormInputTracker onSuccess={() => setFormSubmitted(true)} theme={theme} /> : <Counter theme={theme} />}
    </div>
  );
}

export default App;
