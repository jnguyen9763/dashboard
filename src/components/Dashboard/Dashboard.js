import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import uuid from 'uuid'
import styles from './Dashboard.module.css'
import wd from '../WidgetManager/WidgetDimensions'

import Searchbar from '../Searchbar/Searchbar'
import Quote from '../Quote/Quote'
import DigitalClock from '../Clock/DigitalClock'
import AnalogClock from '../Clock/AnalogClock'
import DateDisplay from '../Date/Date'
import Weather from '../Weather/Weather'
import Pomodoro from '../Pomodoro/Pomodoro'
import Bookmark from '../Bookmark/Bookmark'
import Note from '../Note/Note'
import TodoList from '../TodoList/TodoList'
import Converter from '../Converter/Converter'
import Calculator from '../Calculator/Calculator'

const ReactGridLayout = WidthProvider(RGL)
const columns = 50
const size = window.innerWidth / columns
const rows = Math.round(window.innerHeight / size)
const wdKeys = Object.keys(wd)
const originalState = getFromLS("layout") || {
    date: new Date(),
    layout: [{i: '.' + uuid.v4(), x: 0, y: rows, w: columns, h: 1}],
    show: false,
    deleteMode: false,
    widgetData: {}
    
}

class Dashboard extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        margin: [0, 0],
        cols: columns,
        rowHeight: size,
        compactType: null,
        preventCollision: true,
        isDroppable: true,
        isResizable: false,
        onLayoutChange: function() {}
    }

    /*
        widgets that contain data
        quote
        weather
        pomodoro
        bookmark
        note
        todoList
        converter
    */

    constructor(props) {
        super(props)
        this.state = originalState
        this.currWidgetSize = { i: 'default', w: 1, h: 1 }
        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.modalToggle !== this.props.modalToggle) {
            this.setState({show: true})
        }
        if (prevState.layout !== this.state.layout ||
            prevState.widgetData !== this.state.widgetData) {
            saveToLS("layout", this.state)
        }
    }

    componentDidMount = () => {
        // clock and date
        this.timerID = setInterval(() => this.setState({ date: new Date() }), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    onLayoutChange = layout => {
        this.setState({ layout: layout })
        this.props.onLayoutChange(layout) // updates status display
    }

    onDrop = elemParams => {
        const temp = {...elemParams}
        const tempLayout = [...this.state.layout]
        temp.i = this.currWidgetSize.i
        tempLayout.pop()
        tempLayout.push(temp)
        this.setState({
            layout: tempLayout,
        })
    }

    deleteWidget = id => {
        const tempLayout = [...this.state.layout]
        const newLayout = tempLayout.filter(widget => widget.i !== id)
        this.setState({layout: newLayout})
    }

    updateWidgetData = (id, data) => {
        let widgetDataCopy = {...this.state.widgetData}
        widgetDataCopy[id] = data
        this.setState({widgetData: widgetDataCopy})
    }

    render() {
        return (
            <>
                <ReactGridLayout
                    {...this.props}
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    onDrop={this.onDrop}
                    isDraggable={this.props.draggable}
                    droppingItem={this.currWidgetSize}
                >
                    {this.state.layout.map(e => {
                        return (
                            <div
                                // className={styles.Test}
                                key={e.i}
                                data-grid={{
                                    x: e.x,
                                    y: e.y,
                                    w: e.w,
                                    h: e.h
                                }}
                            >
                                {(() => {
                                    switch(e.i.split('.')[0]) {
                                        case 'searchbar':
                                            return <Searchbar />
                                        case 'quote':
                                            return <Quote />
                                        case 'digitalClock':
                                                return <DigitalClock time={this.state.date} hours24={false} />
                                        case 'digitalClock24':
                                                return <DigitalClock time={this.state.date} hours24={true} />
                                        case 'analogClock':
                                                return <AnalogClock time={this.state.date} renderNumbers={false} />
                                        case 'analogClockNums': 
                                                return <AnalogClock time={this.state.date} renderNumbers={true} />
                                        case 'date':
                                            return <DateDisplay date={this.state.date} />
                                        case 'weather':
                                            return <Weather />
                                        case 'pomodoro':
                                            return <Pomodoro />
                                        case 'bookmark':
                                            return <Bookmark />
                                        case 'note':
                                            return <Note 
                                                id={e.i}
                                                widget={this.state.widgetData[e.i]} 
                                                updateWidgetData={this.updateWidgetData} 
                                            />
                                        case 'todoList':
                                            return <TodoList />
                                        case 'converter':
                                            return <Converter />
                                        case 'calculator':
                                            return <Calculator />
                                        default:
                                            return ''
                                    }
                                })()}
                                {this.state.deleteMode ? 
                                <div className={styles.Delete} onClick={() => this.deleteWidget(e.i)}></div> : 
                                null}
                            </div>
                        )
                    }, this)}
                </ReactGridLayout>

                <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Widgets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.Mode}>
                        <div className="d-flex justify-content-between">
                            <div>Current mode: {this.state.deleteMode ? 'Remove widgets' : 'Add widgets'}</div>
                            <Form.Check 
                                type="switch"
                                id="dashbordSwitch"
                                label=""
                                checked={this.state.deleteMode}
                                onChange={() => this.setState({deleteMode: !this.state.deleteMode})}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Body style={{textAlign: 'center'}}>
                        {wdKeys.map(w => {
                            return (
                                <div
                                    key={w}
                                    className={styles.Widget}
                                    style={{height: `${size * wd[w].h}px`, width: `${size * wd[w].w}px`}}
                                    draggable={true}
                                    unselectable="on"
                                    onDragStart={() => this.setState({
                                        show: false, 
                                        currWidgetSize: { i: w + '.' + uuid.v4(), w: wd[w].w, h: wd[w].h }
                                    })}
                                >
                                    {(() => {
                                        switch(w) {
                                            case 'searchbar':
                                                return <Searchbar />
                                            case 'quote':
                                                return <Quote />
                                            case 'digitalClock':
                                                return <DigitalClock time={this.state.date} hours24={false} />
                                            case 'digitalClock24':
                                                return <DigitalClock time={this.state.date} hours24={true} />
                                            case 'analogClock':
                                                return <AnalogClock time={this.state.date} renderNumbers={false} />
                                            case 'analogClockNums':
                                                return <AnalogClock time={this.state.date} renderNumbers={true} />
                                            case 'date':
                                                return <DateDisplay date={this.state.date} />
                                            case 'weather':
                                                return <Weather />
                                            case 'pomodoro':
                                                return <Pomodoro />
                                            case 'bookmark':
                                                return <Bookmark />
                                            case 'note':
                                                return <Note />
                                            case 'todoList':
                                                return <TodoList />
                                            case 'converter':
                                                return <Converter />
                                            case 'calculator':
                                                return <Calculator />
                                            default:
                                                return ''
                                        }
                                    })()}
                                </div>
                            )
                        }, this)}
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

function getFromLS(key) {
    let ls = {}
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("dashboard")) || {}
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key]
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "dashboard",
            JSON.stringify({
                [key]: value
            })
        )
    }
}

export default Dashboard
