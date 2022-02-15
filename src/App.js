import Timer from './Timer';
import './App.css';
import Settings from './Settings';
import {useState} from "react";
import SettingContext from './SettingsContext';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workSeconds, setWorkSeconds] = useState(45);
  const [breakSeconds, setBreakSeconds] = useState(15); 

  return (
    <main>
      <SettingContext.Provider value={{
        showSettings,
        setShowSettings,
        workSeconds,
        breakSeconds,
        setWorkSeconds,
        setBreakSeconds,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingContext.Provider>
      
    </main>
  );
}

export default App;
