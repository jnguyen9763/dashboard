import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import styles from './Nav.module.css'
import logo from '../../assets/images/logo.png'

function Nav() {
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
            <Button type="button" variant="success" className={styles.Button}>
                +
            </Button>    
        </Navbar>
    )
}

export default Nav

