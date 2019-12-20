import React from 'react'
import Clock from 'react-clock'
import styles from './Clock.module.css'

function AnalogClock({ time, renderNumbers }) {
    return (
        <Clock 
            className={styles.AnalogClock}
            value={time} 
            renderNumbers={renderNumbers}
            size={135}
            hourMarksWidth={2}
            hourMarksLength={12}
            hourHandWidth={3}
            hourHandLength={70}
            minuteHandLength={80}
        />
    )
}

export default AnalogClock
