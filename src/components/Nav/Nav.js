import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdSettings, MdHelp } from 'react-icons/md'
import styles from './Nav.module.css'
import logo from '../../assets/images/logo.png'
import addWidget from '../../assets/demos/adding-widget.mp4'
import removeWidget from '../../assets/demos/removing-widget.mp4'
import moveWidget from '../../assets/demos/moving-widget.mp4'
import widgetSettings from '../../assets/demos/widget-settings.mp4'
import weatherWidget from '../../assets/demos/weather-widget.mp4'

function Nav({ showModal, modalToggle, setModalToggle, draggable, setDraggable }) {
    const [show, setShow] = useState(showModal)
    const [currPage, setCurrPage] = useState(1)
    const totalPages = 8
    let pages = []

    if (showModal) {
        document.cookie = 'firstVisit=true; expires=' + new Date(9999, 0, 1).toUTCString()
    }

    for (var i = 1; i <= totalPages; i++) {
        pages.push(
            <Button 
                key={i}
                variant="link" 
                value={i}
                className={currPage === i ? styles.Active : undefined}
                onClick={e => setCurrPage(parseInt(e.target.value))}
            >
                {i}
            </Button>
        )
    }

    const closeModal = () => {
        setShow(false)
        setCurrPage(1)
    }

    return (
        <div className={styles.Nav}>
            <Navbar bg="dark" variant="dark" className="justify-content-between">
                <Navbar.Brand href={process.env.PUBLIC_URL}>
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="logo"
                    />{" "}    
                    Dashboard
                </Navbar.Brand>
                <div className="d-flex align-items-center">
                    <Form.Check
                        type="switch"
                        id="navSwitch"
                        label=""
                        checked={draggable}
                        onChange={() => setDraggable(!draggable)}
                    />
                    <Button size="sm" type="button" variant="link" onClick={() => setModalToggle(!modalToggle)}>
                        <MdSettings />
                    </Button>
                    <Button size="sm" type="button" variant="link" onClick={() => setShow(true)}>
                        <MdHelp />
                    </Button>
                </div>    
            </Navbar>
            <Modal
                show={show}
                onHide={closeModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tutorial
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.Modal}>
                    <Container>
                        <div className={styles.Pages}>
                            <div className={currPage === 1 ? undefined : styles.Hide}>
                                <Row>
                                    <Col sm={7}>
                                        <h3>Welcome to Dashboard!</h3>
                                        <p>See what you can tinker with, and get started customizing your own dashboard.</p>
                                    </Col>
                                    <Col className="d-flex justify-content-center align-items-center">
                                        <img src={logo} alt="logo" />
                                    </Col>
                                </Row>
                            </div>
                            <div className={currPage === 2 ? undefined : styles.Hide}>
                                <h4>Adding widgets</h4>
                                <video loop controls controlsList="nodownload">
                                    <source src={addWidget} type="video/mp4" />
                                </video>
                                <p>Click on the <MdSettings /> button to see all the widgets you can add.
                                Simply drag any widget to where you want on your dashboard. 
                                You can add any widget any amount of times!</p>
                            </div>
                            <div className={currPage === 3 ? undefined : styles.Hide}>
                                <h4>Moving widgets</h4>
                                <video loop controls controlsList="nodownload">
                                    <source src={moveWidget} type="video/mp4" />
                                </video>
                                <p>Toggle the switch next to the <MdSettings /> button to switch drag mode 
                                on and off. When the switch is on, you can reposition your widgets. Switch 
                                it off when you're happy with your layout.</p>
                            </div>
                            <div className={currPage === 4 ? undefined : styles.Hide}>
                                <h4>Removing widgets</h4>
                                <video loop controls controlsList="nodownload">
                                    <source src={removeWidget} type="video/mp4" />
                                </video>
                                <p>Click on the <MdSettings /> button and toggle the first switch to turn on 
                                'Remove widgets' mode. Go back to your dashboard and click on any widget you 
                                would like to remove. Switch back to 'Add widgets' mode when you are done.</p>
                            </div>
                            <div className={currPage === 5 ? undefined : styles.Hide}>
                                <h4>Widget Settings</h4>
                                <video loop controls controlsList="nodownload">
                                    <source src={widgetSettings} type="video/mp4" />
                                </video>
                                <p>Click on the <MdSettings /> button to see all widget settings.
                                You can change the settings anytime and your widgets will update accordingly!</p>
                            </div>
                            <div className={currPage === 6 ? undefined : styles.Hide}>
                                <h4>Weather Widget</h4>
                                <video loop controls controlsList="nodownload">
                                    <source src={weatherWidget} type="video/mp4" />
                                </video>
                                <p>The weather widget is really handy and has a lot of features.
                                By default, it will ask you for your location and show you the weather 
                                around your area. However, you can always check other cities' weather by 
                                entering the city name. If you want your local weather back, hit 'Enter'
                                on a blank input.</p>
                            </div>
                            <div className={currPage === 7 ? undefined : styles.Hide}>
                                <h4>Credits</h4>
                                <p>These are some of the resources that I used to create this web app!</p>
                                <p>The weather widget was made with <a href="https://openweathermap.org/" 
                                target="_blank" rel="noopener noreferrer">Open Weather Map</a>.</p>
                                <p>Search engines' icons came from <a href="https://flaticon.com/" 
                                target="_blank" rel="noopener noreferrer">Flaticon</a>.</p>
                                <p>All svgs came from <a href="https://material.io/design/" 
                                target="_blank" rel="noopener noreferrer">Material Design</a>.</p>
                                <p>The analog clock was made by Wojciech Maj. Here is the <a href="https://github.com/wojtekmaj/react-clock" 
                                target="_blank" rel="noopener noreferrer">github repo</a>.</p>
                            </div>
                            <div className={currPage === 8 ? undefined : styles.Hide}>
                                <h3>End of Tutorial</h3>
                                <p>You can always access this tutorial by clicking on the <MdHelp /> button.</p>
                                <p>Now that you know the ins and outs, go make a dashboard that works for you!</p>
                            </div>
                        </div>
                        <div className={styles.Footer}>
                            <Button
                                className={currPage === 1 ? styles.Invisible : undefined} 
                                variant="link" 
                                onClick={() => setCurrPage(currPage - 1)}
                            >
                                Prev
                            </Button>
                            <ButtonToolbar className="d-flex justify-content-center">
                                <ButtonGroup className={styles.Pagination}>
                                    {pages}
                                </ButtonGroup>
                            </ButtonToolbar>
                            {currPage === totalPages ?
                            <Button variant="link" onClick={closeModal}>Exit</Button> :
                            <Button variant="link" onClick={() => setCurrPage(currPage + 1)}>Next</Button>
                            }
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Nav

