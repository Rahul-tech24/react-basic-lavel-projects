import { useState, useEffect } from 'react'
import Counter from './component/counter/Counter'
import './App.css'
import ThemeToggle from './component/ThemeToggle/ThemeToggle'
import FormInputTracker from './component/formInputTracker/FormInputTracker'

function App() {
    const [username, setUsername] = useState(null);

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
      {!username ? <FormInputTracker onSuccess={(name) => setUsername(name)}  theme={theme} /> : <Counter theme={theme}  name={username} />}
    </div>
  );
}

export default App;