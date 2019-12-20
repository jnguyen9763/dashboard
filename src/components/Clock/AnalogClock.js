import React from 'react'
import Clock from 'react-clock'

function AnalogClock({ time, renderNumbers }) {
    return (
        <Clock value={time} renderNumbers={renderNumbers}/>
    )
}

export default AnalogClock
