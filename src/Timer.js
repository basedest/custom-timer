import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef} from 'react';
import SettingContext from './SettingsContext';
import workSound from "./sounds/work-sound.mp3";
import breakSound from "./sounds/break-sound.mp3";
import UIFx from 'uifx';

const red = '#f54e4e';
const green = '#4aec8c';


function Timer() {
    const settingsInfo = useContext(SettingContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, SetMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = nextMode === 'work' ? settingsInfo.workSeconds : settingsInfo.breakSeconds;
            
            SetMode(nextMode);
            modeRef.current = nextMode;
    
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;

            const soundSrc = nextMode === "work" ? workSound : breakSound;
            const sound = new UIFx(
                soundSrc,
                {
                    volume: 1.0
                }
            )
            sound.play();
        }

        secondsLeftRef.current = settingsInfo.workSeconds;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'work' ? settingsInfo.workSeconds : settingsInfo.breakSeconds;
    const percentage = Math.round(secondsLeft / totalSeconds*100);

    return (
        <div>
            <CircularProgressbar value={percentage} text={`${secondsLeft}`} styles={buildStyles({
                textColor: '#fff',
                pathColor: mode === 'work' ? red : green,
                trailColor: 'rgba(255,255,255,.2)',   
            })}/>
            <div style={{marginTop: '20px'}}>
                {isPaused
                ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false;}}/>
                : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true;}}/>}
            </div>
            <div style={{marginTop: '20px'}}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    )
}

export default Timer;