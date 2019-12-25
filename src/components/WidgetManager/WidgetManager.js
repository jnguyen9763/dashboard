import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import Dashboard from '../Dashboard/Dashboard'
// import wd from './WidgetDimensions'

function WidgetManager() {
    // const [widget, setWidget] = useState([])
    const [modalToggle, setModalToggle] = useState(false)
    
    // const addWidget = type => {
    //     console.log(type)
    //     setWidget({i: type, x: 0, y: 0, w: wd[type].w, h: wd[type].h})
    // }

    return (
        <div>
            <Nav modalToggle={modalToggle} setModalToggle={setModalToggle}/>
            <Dashboard modalToggle={modalToggle} />
        </div>
    )
}

export default WidgetManager
