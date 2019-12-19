import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

function Nav() {
    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand href="/">
                <img
                    src="/images/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                />{" "}    
                Dashboard
            </Navbar.Brand>
            <Button type="button" variant="light" className="shadow-none">
                Add Widget
            </Button>    
        </Navbar>
    )
}

export default Nav

