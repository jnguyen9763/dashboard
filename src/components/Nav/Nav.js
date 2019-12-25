import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './Nav.module.css'
import logo from '../../assets/images/logo.png'
import { MdSettings } from 'react-icons/md'

function Nav({ modalToggle, setModalToggle, draggable, setDraggable }) {
    return (
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
                    onClick={() => setDraggable(!draggable)}
                />
                <Button type="button" variant="link" className={styles.Button} onClick={() => setModalToggle(!modalToggle)}>
                    <MdSettings />
                </Button>
            </div>    
        </Navbar>
    )
}

export default Nav

