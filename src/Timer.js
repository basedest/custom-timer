import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useContext, useState, useEffect, useRef} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import SettingContext from './SettingsContext';
import workSoundSrc from "./sounds/work-sound.mp3";
import breakSoundSrc from "./sounds/break-sound.mp3";
import UIFx from 'uifx';

const red = '#f54e4e';
const green = '#4aec8c';

const workSound = new UIFx(
    workSoundSrc,
    {
        volume: 1.0
    }
);
const breakSound = new UIFx(
    breakSoundSrc,
    {
        volume: 1.0
    }
);

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

            nextMode === "work" ? workSound.play() : breakSound.play();
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
    const percentage = secondsLeft / totalSeconds*100;

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