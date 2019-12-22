import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import styles from './Weather.module.css'

function Weather() {
    const [location, setLocation] = useState('')
    const [temperature, setTemperature] = useState(0)
    const [description, setDescription] = useState('')
    const [feelsLike, setFeelsLike] = useState(0)
    const [icon, setIcon] = useState(0)

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(location => {
            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
            const url = "http://api.openweathermap.org/data/2.5/weather?lat=" 
            + location.coords.latitude + "&lon=" + location.coords.longitude + "&APPID=" + API_KEY
            axios.get(url).then(res => {
                setLocation(res.data.name)
                setTemperature(Math.round(res.data.main.temp * 9 / 5 - 459.67))
                setDescription(res.data.weather[0].main)
                setFeelsLike(Math.round(res.data.main.feels_like * 9 / 5 - 459.67))
                setIcon("http://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png")
            })
        })
    }, [])

    const handleKeyPress = (e) => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
        if (e.key === 'Enter') {
            if (e.target.value === '') {
                window.navigator.geolocation.getCurrentPosition(location => {
                    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" 
                    + location.coords.latitude + "&lon=" + location.coords.longitude + "&APPID=" + API_KEY
                    fetchWeather(url)
                })
            }
            else {
                const url = "http://api.openweathermap.org/data/2.5/weather?q=" 
                + e.target.value.replace(/\s/g, '') + "&APPID=" + API_KEY
                fetchWeather(url)
            }
        }
    }

    const fetchWeather = (url) => {
        axios.get(url).then(res => {
            setLocation(res.data.name)
            setTemperature(Math.round(res.data.main.temp * 9 / 5 - 459.67))
            setDescription(res.data.weather[0].main)
            setFeelsLike(Math.round(res.data.main.feels_like * 9 / 5 - 459.67))
            setIcon("http://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png")
        })
    }

    return (
        <div>
            <div className={styles.Header}></div>
            <Container className={styles.Weather}>
                <Row>
                    <Col className={styles.Info}>
                        <h6>Temp</h6>
                        <h6>{Math.round(temperature)}°F</h6>
                    </Col>
                    <Col>
                        <img src={icon} alt={description} height={64} width={64} />
                        <h5>{description}</h5>
                    </Col>
                    <Col className={styles.Info}>
                        <h6>Feels</h6>
                        <h6>{feelsLike}°F</h6>
                    </Col>
                </Row>
                <Row>
                    <Form.Control
                        type="text"
                        value={location}
                        size={"sm"}
                        className={styles.Text}
                        placeholder="Enter a city name"
                        onChange={e => setLocation(e.target.value)} 
                        onKeyPress={handleKeyPress}
                    />
                </Row>
            </Container>
        </div>
    )
}

export default Weather
