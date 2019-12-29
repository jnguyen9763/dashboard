import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
import { getFromLS } from './LocalStorage'

function WidgetManager() {
    const [modalToggle, setModalToggle] = useState(false)
    const [draggable, setDraggable] = useState(false)
    
    return (
        <div>
            <Nav
                showModal={getFromLS("layout") === undefined} 
                modalToggle={modalToggle} 
                setModalToggle={setModalToggle}
                draggable={draggable}
                setDraggable={setDraggable}    
            />
            <Dashboard modalToggle={modalToggle} draggable={draggable} />
        </div>
    )
}

export default WidgetManager
