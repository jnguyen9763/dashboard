import React, { useState, useEffect } from 'react'
import jsonp from 'jsonp'

function Weather() {
    const [weather, setWeather] = useState({})
    // temp, precipitation, wind

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
        const url = "https://api.darksky.net/forecast/" + API_KEY + "/37.8267,-122.4233?units=auto"

        jsonp(url, null, (err, res) => {
            if (err) {
                console.error(err.message)
            } else {
                setWeather(res.currently)
            }
        })
    }, [])

    return (
        <div>
            <div>{weather.icon}</div>
            <div>{weather.summary}</div>
            <div>{weather.temperature}</div>
            <div>{weather.precipProbability}</div>
        </div>
    )
}

export default Weather
