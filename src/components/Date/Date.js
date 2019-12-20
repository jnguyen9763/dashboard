import React from 'react'
import styles from './Date.module.css'

function Date({ date }) {
    return (
        <div className={styles.Date}>
            <h4>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)}</h4>
            <h1>{new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}</h1>
            <h5>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}</h5>
        </div>
    )
}

export default Date
