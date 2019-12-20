import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import styles from './DigitalClock.module.css'

function DigitalClock({ time, hours24 }) {
    const getHours = () => {
        let hours = time.getHours();
        if (!hours24) {
            if (hours < 1) hours += 12;
            if (hours > 12) hours -= 12;
        }
        return ('0' + hours).slice(-2);
    }

    const getMinutes = () => {
        const minutes = time.getMinutes();
        return ('0' + minutes).slice(-2);
    }

    const getSeconds = () => {
        const seconds = time.getSeconds();
        return ('0' + seconds).slice(-2);
    }

    const getPeriod = () => {
        const hours = time.getHours();
        return hours < 12 ? "AM" : "PM";
    }

    return (
        <CircularProgressbar 
            className={styles.DigitalClock}
            text={`${getHours()} : ${getMinutes()} ${!hours24 ? getPeriod() : ''}`}
            value={getSeconds() / 60}
            maxValue={1}
            strokeWidth={5}
            styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
             
                // Text size
                textSize: '16px',
             
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
             
                // Colors
                pathColor: `rgba(41, 43, 44, ${getSeconds() / 60})`,
                textColor: '#292b2c',
                trailColor: 'rgba(169, 169, 169, 0.25)'
            })}
        />
    )
}

export default DigitalClock
