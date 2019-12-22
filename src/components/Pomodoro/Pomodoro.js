import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import styles from './Pomodoro.module.css'
import { MdPlayArrow, MdReplay, MdPause } from 'react-icons/md'

class Pomodoro extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            session: 'Work',
            clockRunning: false,
            workDuration: 1500,
            timeLeft: 1500,
            breakDuration: 300,
            ID: 0,
            showModal: false
        }

        this.startClock = this.toggleClock.bind(this, false)
        this.stopClock = this.toggleClock.bind(this, true)
    }

    toggleClock(reset) {
        if (reset) {
            // stop the timer
            clearInterval(this.state.ID)
            this.setState({
                clockRunning: false,
                timeLeft: this.state.workDuration,
                session: 'Work'
            })
        } else {
            if (this.state.clockRunning === true) {
                // pause the timer
                clearInterval(this.state.ID)
                this.setState({clockRunning: false})
            } else {
                // start the timer
                const ID = setInterval(() => this.toggleSession(), 1000)
                this.setState({ID: ID, clockRunning: true})
            }
        }
    }

    toggleSession() {
        if (this.state.timeLeft > 0) {
            // decrease time left
            let time = this.state.timeLeft
            this.setState({ timeLeft: --time })
        } else if (this.state.timeLeft === 0) {
            // timer is over -> if work switch to break, viceversa
            if (this.state.session === 'Work') {
                this.setState({
                    session: 'Break',
                    timeLeft: this.state.breakDuration
                })
            } else {
                this.setState({
                    session: 'Work',
                    timeLeft: this.state.workDuration
                })
            }
        }
    }

    displayTime() {
        const minutes = Math.floor(this.state.timeLeft / 60)
        const seconds = Math.floor(this.state.timeLeft % 60)
        return ('0' + minutes).slice(-2) + " : " + ('0' + seconds).slice(-2)
    }

    setWorkDuration(self, workDuration) {
        self.setState({
            workDuration: workDuration * 60
        })
    }

    setBreakDuration(self, breakDuration) {
        self.setState({
            breakDuration: breakDuration * 60
        })
    }

    updateTimeLeft(isWorkDuration, duration) {
        if (isWorkDuration) {
            this.setState({workDuration: duration})
            if (this.state.session === 'Work') this.setState({timeLeft: duration})
        }
        else {
            this.setState({breakDuration: duration})
            if (this.state.session === 'Break') this.setState({timeLeft: duration})
        }
    }

    render() {
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
                    <div>{this.state.session}</div>
                    <h3>{this.displayTime()}</h3>
                </CircularProgressbarWithChildren>
                <ButtonToolbar className="d-flex justify-content-around">
                    <Button onClick={this.stopClock} variant="link" size="lg"><MdReplay /></Button>
                    {!this.state.clockRunning ? 
                    <Button ref="start" onClick={this.startClock} variant="link" size="lg"><MdPlayArrow /></Button> :
                    <Button ref="start" onClick={this.startClock} variant="link" size="lg"><MdPause /></Button>}
                </ButtonToolbar>
                <InputGroup className={styles.Inputs}>
                    <Form.Control type="text" size="sm" placeholder="Work" 
                    value={this.state.workDuration / 60} onChange={(e) => this.updateTimeLeft(true, e.target.value * 60)}/>
                    <Form.Control type="text" size="sm" placeholder="Break" 
                    value={this.state.breakDuration / 60} onChange={(e) => this.updateTimeLeft(false, e.target.value * 60)}/>
                </InputGroup>
            </div>
        )
    }
}

export default Pomodoro
