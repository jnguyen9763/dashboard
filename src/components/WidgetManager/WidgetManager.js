import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'

function WidgetManager() {
    const [modalToggle, setModalToggle] = useState(false)
    const [draggable, setDraggable] = useState(false)
    
    return (
        <div>
            <Nav
                // showModal={document.cookie === ''} 
                showModal={true} 
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
