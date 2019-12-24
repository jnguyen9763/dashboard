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

    // TODO: handle decimal numbers and delimiting

    const addNum = num => {
        if (num === '0' && number === '0') return
        if (hasDecimal && num === '.') return
        if (!hasDecimal && num === '.') {
            setHasDecimal(true)
            if (number === '') setNumber('0.')
            else setNumber(number + num)
            return
        }
        setNumber(number + num)
    }

    const getOperatedNumber = () => {
        if (operatedNumber === '') return 0
        else return parseFloat(operatedNumber)
    }

    const operate = operation => {
        if (number === '') return
        const num = parseFloat(number)
        const operatedNum = getOperatedNumber()
        setOperation(operation)
        setNumber('')
        setHasDecimal(false)
        if (operatedNumber === '') {
            setOperatedNumber(num.toString())
            return
        }
        setOperatedNumber(operations(operatedNum, num).toString())
    }

    const operations = (num1, num2) => {
        switch(operation) {
            case '+':
                return (num1 + num2)
            case '-':
                return (num1 - num2)
            case '/':
                return (num1 / num2)
            case '*':
                return (num1 * num2)
            default:
                return;
        }
    }

    const equal = () => {
        if (number === '' || operatedNumber === '') return
        const num = parseFloat(number)
        const operatedNum = getOperatedNumber()
        setNumber(operations(operatedNum, num).toString())
        setOperatedNumber('')
        setOperation('')
    }

    const clearAll = () => {
        setNumber('')
        setOperatedNumber('')
        setOperation('')
        setHasDecimal(false)
    }

    const deleteDigit = () => {
        if (number[number.length - 1] === '.') setHasDecimal(false)
        setNumber(number.slice(0, -1))
    }

    return (
        <div className={styles.Calculator}>
            <Container>
                <Row>
                    <h6>{operatedNumber} {operation}</h6>
                </Row>
                <Row>
                    <h4>{number}</h4>
                </Row>
                <Row>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => clearAll()} sm={6}>AC</Button>
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => deleteDigit()}><MdBackspace /></Button>
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
                    <Button variant="link" className={styles.Button} as={Col} onClick={() => equal()} sm={6}>=</Button>
                </Row>
            </Container>
        </div>
    )
}

export default Calculator
