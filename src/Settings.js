import { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import SettingContext from "./SettingsContext";
import './slider.css'

function Settings() {
    const settingsInfo = useContext(SettingContext);
    return(
        <div style={{textAlign:'left'}}>
            <label>work: {settingsInfo.workSeconds}</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workSeconds}
                onChange={newValue => settingsInfo.setWorkSeconds(newValue)}
                min={1}
                max={300}
            />
            <label>break: {settingsInfo.breakSeconds}</label>
            <ReactSlider
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakSeconds}
                onChange={newValue => settingsInfo.setBreakSeconds(newValue)}
                min={1}
                max={300}
            />
            <div style={{textAlign: 'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
            </div>
            
        </div>
    )
}

export default Settings;