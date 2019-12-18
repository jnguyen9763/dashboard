import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

function Nav() {
    return (
        <Navbar bg='dark' variant='dark'>
            <Navbar.Brand href='/'>
                <img
                    src='/images/logo.png'
                    width='30'
                    height='30'
                    className='d-inline-block align-top'
                    alt='logo'
                />    
                Dashboard
            </Navbar.Brand>
        </Navbar>
    )
}

export default Nav

