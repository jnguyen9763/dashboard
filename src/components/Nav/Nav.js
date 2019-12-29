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

function Nav({ modalToggle, setModalToggle, draggable, setDraggable }) {
    const [show, setShow] = useState(true)
    const [currPage, setCurrPage] = useState(1)
    const totalPages = 3
    let pages = []

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

    return (
        <div className={styles.Nav}>
            <Navbar bg="dark" variant="dark" className="justify-content-between">
                <Navbar.Brand href="/">
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
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Help
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.Modal}>
                    <Container>
                        <div className={currPage === 1 ? undefined : styles.Hide}>
                            test 1
                        </div>
                        <div className={currPage === 2 ? undefined : styles.Hide}>
                            test 2
                        </div>
                        <div className={currPage === 3 ? undefined : styles.Hide}>
                            test 3
                        </div>
                        <Row>
                            <Col>
                                <Button variant="link" onClick={() => currPage > 1 && setCurrPage(currPage - 1)}>Prev</Button>
                            </Col>
                            <Col sm={6}>
                                <ButtonToolbar className="d-flex justify-content-center">
                                    <ButtonGroup className={styles.Pagination}>
                                        {pages}
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                            <Col>
                                <Button variant="link" onClick={() => currPage < totalPages && setCurrPage(currPage + 1)}>Next</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                    {/* <div>Weather widget made with <a href="https://openweathermap.org/" target="_blank">Open Weather Map</a></div> */}
            </Modal>
        </div>
    )
}

export default Nav

