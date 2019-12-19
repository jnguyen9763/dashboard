import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
// import styles from './Dashboard.module.css'

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
    onLayoutChange: function() {}
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
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
