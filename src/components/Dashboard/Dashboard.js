import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import Modal from 'react-bootstrap/Modal'
// import styles from './Dashboard.module.css'

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
// const originalLayout = getFromLS("layout") || [{i: ' ', x: 0, y: rows, w: columns, h: 1}]
const originalLayout = [{i: ' ', x: 0, y: rows, w: columns, h: 1}]

class Dashboard extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        margin: [0, 0],
        cols: columns,
        rowHeight: size,
        compactType: null,
        preventCollision: true,
        isResizable: false,
        onLayoutChange: function() {}
    }

    constructor(props) {
        super(props)

        this.state = {
            layout: originalLayout,
            date: new Date(),
            show: false,
            currWidgetSize: { i: 'default', w: 1, h: 1 }
        }

        this.onLayoutChange = this.onLayoutChange.bind(this)
    }

    componentDidUpdate = prevProps => {
        // if (prevProps.widget !== this.props.widget) {
        //     // console.log(this.props.widgets)
        //     let tempLayout = [...this.state.layout]
        //     tempLayout.push(this.props.widget)
        //     this.setState({layout: tempLayout})
        // }
        if (prevProps.modalToggle !== this.props.modalToggle) {
            this.setState({show: true})
        }
    }

    componentDidMount = () => {
        // clock and date
        setInterval(() => this.setState({ date: new Date() }), 1000);
    }

    onLayoutChange = layout => {
        saveToLS("layout", layout)
        this.setState({ layout })
        this.props.onLayoutChange(layout) // updates status display
    }

    onDrop = elemParams => {
        let temp = {...elemParams}
        let tempLayout = [...this.state.layout]
        temp.i = 'date'
        tempLayout.pop()
        tempLayout.push(temp)
        this.setState({layout: tempLayout})
    }

    render() {
        return (
            <>
                <ReactGridLayout
                {...this.props}
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                onDrop={this.onDrop}
                isDroppable={true}
                droppingItem={this.state.currWidgetSize}
                >
                    {this.state.layout.map((e, ind) => {
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
                                    switch(e.i) {
                                        case 'searchbar':
                                            return <Searchbar />
                                        case 'quote':
                                            return <Quote />
                                        case 'digitalClock':
                                            return <DigitalClock time={this.state.date} hours24={false} />
                                        case 'analogClock':
                                            return <AnalogClock time={this.state.date} renderNumbers={false} />
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
                                            return e.i
                                    }
                                })()}
                            </div>
                        )
                    }, this)}
                </ReactGridLayout>

                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    // dialogClassName="modal-90w"
                    // aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Widgets
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div 
                            style={{height: `${size * 6}px`, width: `${size * 6}px`}}
                            draggable={true}
                            unselectable="on"
                            onDragStart={e => this.setState({show: false, currWidgetSize: { i: 'date', w: 6, h: 6 }})}
                        >
                            <DateDisplay 
                                date={this.state.date} 
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

// function getFromLS(key) {
//     let ls = {}
//     if (global.localStorage) {
//         try {
//             ls = JSON.parse(global.localStorage.getItem("dashboard")) || {}
//         } catch (e) {
//             /*Ignore*/
//         }
//     }
//     return ls[key]
// }

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
