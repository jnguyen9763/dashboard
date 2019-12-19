import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import styles from './Dashboard.module.css'

const ReactGridLayout = WidthProvider(RGL)
const originalLayout = getFromLS("layout") || []
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class Dashboard extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {}
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.resetLayout = this.resetLayout.bind(this)
  }

  resetLayout() {
    this.setState({
      layout: []
    })
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout)
    this.setState({ layout })
    this.props.onLayoutChange(layout) // updates status display
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
          <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
            <span className={styles.Text}>1</span>
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
            <span className={styles.Text}>2</span>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
            <span className={styles.Text}>3</span>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
            <span className={styles.Text}>4</span>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <span className={styles.Text}>5</span>
          </div>
        </ReactGridLayout>
      </div>
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
