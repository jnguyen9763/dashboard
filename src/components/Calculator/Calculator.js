import React from 'react'
import styles from './Calculator.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { MdBackspace } from 'react-icons/md'

function Calculator() {
    return (
        <div className={styles.Calculator}>
            <Container>
                <Row>
                    <Col><h6>test</h6></Col>
                </Row>
                <Row>
                    <Col><h4>test</h4></Col>
                </Row>
                <Row>
                    <Col sm={6}><Button>AC</Button></Col>
                    <Col sm={3}><Button><MdBackspace /></Button></Col>
                    <Col><Button>÷</Button></Col>
                </Row>
                <Row>
                    <Col><Button>1</Button></Col>
                    <Col><Button>2</Button></Col>
                    <Col><Button>3</Button></Col>
                    <Col><Button>×</Button></Col>
                </Row>
                <Row>
                    <Col><Button>4</Button></Col>
                    <Col><Button>5</Button></Col>
                    <Col><Button>6</Button></Col>
                    <Col><Button>+</Button></Col>
                </Row>
                <Row>
                    <Col><Button>7</Button></Col>
                    <Col><Button>8</Button></Col>
                    <Col><Button>9</Button></Col>
                    <Col><Button>-</Button></Col>
                </Row>
                <Row>
                    <Col><Button>.</Button></Col>
                    <Col><Button>0</Button></Col>
                    <Col sm={6}><Button>=</Button></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Calculator
