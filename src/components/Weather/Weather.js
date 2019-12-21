import React, { useState, useEffect } from 'react'
import jsonp from 'jsonp'
import ReactAnimatedWeather from 'react-animated-weather'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import styles from './Weather.module.css'

function Weather() {
    const [weather, setWeather] = useState({})
    const [icon, setIcon] = useState('')
    // temp, precipitation, wind

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
        const url = "https://api.darksky.net/forecast/" + API_KEY + "/37.8267,-122.4233?units=auto"

        jsonp(url, null, (err, res) => {
            if (err) {
                console.error(err.message)
            } else {
                const icon = res.currently.icon.toUpperCase()
                setWeather(res.currently)
                setIcon(icon)
            }
        })
    }, [])

    return (
        <div>
            <div className={styles.Header}></div>
            <Container className={styles.Weather}>
                <Row>
                    <Col className={styles.Info}>
                        <div>Temp.</div>
                        <div>{weather.temperature}</div>
                    </Col>
                    <Col>
                        <ReactAnimatedWeather
                            icon={icon}
                            color={"#292b2c"}
                            className={styles.Icon}
                            size={48}
                        />
                        <div>{weather.summary}</div>
                    </Col>
                    <Col className={styles.Info}>
                        <div>Precip.</div>
                        <div>{weather.precipProbability}</div>
                    </Col>
                </Row>
                <Row>
                    <Form.Control size={"sm"} className={styles.Text} type="text" />
                    <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
                </Row>
            </Container>
        </div>
    )
}

export default Weather
