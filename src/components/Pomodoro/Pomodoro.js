import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import styles from './Pomodoro.module.css'
import { MdPlayArrow, MdReplay, MdSettings } from 'react-icons/md';

function Pomodoro() {
    // const [workDuration, setWorkDuration] = useState(25)
    // const [breakDuration, setBreakDuration] = useState(5)

    return (
        <div className={styles.Pomodoro}>
            <CircularProgressbarWithChildren
                className={styles.CircleDisplay}
                strokeWidth={5}
                styles={buildStyles({
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                
                    // Text size
                    textSize: '16px',
                
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                
                    // Colors
                    pathColor: `white`,
                    textColor: '#292b2c',
                    trailColor: 'rgba(255, 255, 255, 0.25)'
                })}
            >
                <div>Work</div>
                <h3>25:00</h3>
            </CircularProgressbarWithChildren>
            <ButtonToolbar className="d-flex justify-content-around">
                <Button variant="link" size="lg"><MdReplay /></Button>
                <Button className={styles.playButton} variant="link" size="lg"><MdPlayArrow /></Button>
                <Button variant="link" size="lg"><MdSettings /></Button>
            </ButtonToolbar>
        </div>
    )
}

export default Pomodoro
