import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import styles from './Dashboard.module.css'

import Searchbar from '../Searchbar/Searchbar'
import Quote from '../Quote/Quote'
import DigitalClock from '../Clock/DigitalClock'
import AnalogClock from '../Clock/AnalogClock'
import DateDisplay from '../Date/Date'
import Weather from '../Weather/Weather'
import Pomodoro from '../Pomodoro/Pomodoro'

const ReactGridLayout = WidthProvider(RGL)
const originalLayout = getFromLS("layout") || []
const columns = 50
const size = window.innerWidth / columns

/**
 * This layout demonstrates how to sync to localstorage.
 */
class Dashboard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    margin: [0, 0],
    cols: columns,
    rowHeight: size,
    compactType: null,
    preventCollision: true,
    isResizable: false,
    isDraggable: false,
    onLayoutChange: function() {}
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
      date: new Date()
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  componentDidMount() {
    // clock and date
    setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout)
    this.setState({ layout })
    this.props.onLayoutChange(layout) // updates status display
  }

  render() {
    return (
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
            <div className={styles.Test} key="searchbar" data-grid={{x: 0, y: 0, w: 24, h: 2}}>
                <Searchbar />
            </div>

            <div className={styles.Test} key="quote" data-grid={{x: 24, y: 0, w: 26, h: 3}}>
                <Quote />
            </div>

            <div className={styles.Test} key="digitalClock12" data-grid={{x: 0, y: 2, w: 6, h: 6}}>
                <DigitalClock time={this.state.date} hours24={false} />
            </div>

            <div className={styles.Test} key="digitalClock24" data-grid={{x: 6, y: 2, w: 6, h: 6}}>
                <DigitalClock time={this.state.date} hours24={true} />
            </div>

            <div className={styles.Test} key="analogClock" data-grid={{x: 12, y: 2, w: 6, h: 6}}>
                <AnalogClock time={this.state.date} renderNumbers={false} />
            </div>

            <div className={styles.Test} key="analogClockNums" data-grid={{x: 18, y: 2, w: 6, h: 6}}>
                <AnalogClock time={this.state.date} renderNumbers={true} />
            </div>

            <div className={styles.Test} key="date" data-grid={{x: 24, y: 2, w: 6, h: 6}}>
                <DateDisplay date={this.state.date} />
            </div>

            <div className={styles.Test} key="weather" data-grid={{x: 30, y: 2, w: 12, h: 7}}>
                <Weather />
            </div>

            <div className={styles.Test} key="pomodoro" data-grid={{x: 42, y: 2, w: 6, h: 9}}>
                <Pomodoro />
            </div>
        </ReactGridLayout>
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
