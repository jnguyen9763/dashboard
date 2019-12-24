import React, { useState } from 'react'
import styles from './Calculator.module.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { MdBackspace } from 'react-icons/md'

function Calculator() {
    const [number, setNumber] = useState('')
    const [operatedNumber, setOperatedNumber] = useState('')
    const [hasDecimal, setHasDecimal] = useState(false)
    const [operation, setOperation] = useState('')

    const addNum = num => {
        if (hasDecimal && num === '.') return
        if (!hasDecimal && num === '.') {
            setHasDecimal(true)
            if (number === '') setNumber('0.')
            else setNumber(number + num)
            return
        }
        setNumber(number + num)
    }

    const operate = operation => {
        const num = parseFloat(number)
        setOperation(operation)
        setNumber('')
        if (operatedNumber === '') {
            setOperatedNumber(num)
            return
        }
        switch(operation) {
            case '+':
                setOperatedNumber(operatedNumber + num)
                break;
            case '-':
                setOperatedNumber(operatedNumber - num)
                break;
            case '/':
                setOperatedNumber(operatedNumber / num)
                break;
            case '*':
                setOperatedNumber(operatedNumber * num)
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.Calculator}>
            <Container>
                <Row>
                    <h6>{operatedNumber === 0 ? '' : operatedNumber}</h6>
                </Row>
                <Row>
                    <h4>{number}</h4>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} sm={6}>AC</Button>
                    <Button variant="link" className={styles.Button} as={Col}><MdBackspace /></Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => operate('/')}>÷</Button>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('1')}>1</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('2')}>2</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('3')}>3</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => operate('*')}>×</Button>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('4')}>4</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('5')}>5</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('6')}>6</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => operate('+')}>+</Button>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('7')}>7</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('8')}>8</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('9')}>9</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => operate('-')}>-</Button>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('.')}>.</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => addNum('0')}>0</Button>
                    <Button variant="link" className={styles.Button} as={Col} sm={6}>=</Button>
                </Row>
            </Container>
        </div>
    )
}

export default Calculator
