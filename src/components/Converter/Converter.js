import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './Converter.module.css'
import convert from 'convert-units'

function Converter() {
    const units = convert().measures()
    const [unitType, setUnitType] = useState(units[0])
    const [leftUnit, setLeftUnit] = useState(convert().possibilities(unitType)[0])
    const [rightUnit, setRightUnit] = useState(convert().possibilities(unitType)[1])
    const [leftValue, setLeftValue] = useState('')
    const [rightValue, setRightValue] = useState('')

    useEffect(() => {
        setLeftUnit(convert().possibilities(unitType)[0])
        setRightUnit(convert().possibilities(unitType)[1])
    }, [unitType])

    const convertValue = (value, unit1, unit2) => {
        return convert(value).from(unit1).to(unit2)
    }

    const conversionBridge = (isLeftSide, value) => {
        if (isLeftSide) {
            const newValue = convertValue(value, leftUnit, rightUnit)
            setLeftValue(value)
            setValue(setRightValue, newValue)
        }
        else {
            const newValue = convertValue(value, rightUnit, leftUnit)
            setRightValue(value)
            setValue(setLeftValue, newValue)
        }
    }

    const changeLeftUnit = (newUnit) => {
        const newValue = convertValue(leftValue, newUnit, rightUnit)
        setLeftUnit(newUnit)
        setValue(setRightValue, newValue)
    }

    const changeRightUnit = (newUnit) => {
        const newValue = convertValue(rightValue, newUnit, leftUnit)
        setRightUnit(newUnit)
        setValue(setLeftValue, newValue)
    }

    const setValue = (setFunction, newValue) => {
        if (newValue !== 0) {
            setFunction(newValue)
            return
        }
        setFunction('')
    }

    return (
        <div className={styles.Converter}>
            <Container>
                <Row>
                    <Col>
                        <DropdownButton
                            id="unitTypeDropdown"
                            title={unitType}
                            variant="light"
                            className={styles.UnitTypeButton}
                        >
                            {units.map((type, index) => {
                                return <Dropdown.Item 
                                            onSelect={(e) => setUnitType(e)} 
                                            eventKey={type}
                                            key={index}
                                        >
                                        {type}
                                        </Dropdown.Item>
                            })}                
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control 
                            type="text" 
                            value={leftValue} 
                            onChange={(e) => conversionBridge(true, e.target.value)} 
                        />
                        <DropdownButton
                            id="unitLeftSideDropdown"
                            title={leftUnit}
                            variant="light"
                        >
                            {convert().possibilities(unitType).map((type, index) => {
                                return <Dropdown.Item 
                                            onSelect={(e) => changeLeftUnit(e)} 
                                            eventKey={type}
                                            key={index}
                                        >
                                        {type}
                                        </Dropdown.Item>
                            })}                
                        </DropdownButton>
                    </Col>
                    <h3>=</h3>
                    <Col>
                        <Form.Control 
                            type="text" 
                            value={rightValue} 
                            onChange={(e) => conversionBridge(false, e.target.value)} 
                        />
                        <DropdownButton
                            id="unitRightSideDropdown"
                            title={rightUnit}
                            variant="light"
                        >
                            {convert().possibilities(unitType).map((type, index) => {
                                return <Dropdown.Item 
                                            onSelect={(e) => changeRightUnit(e)} 
                                            eventKey={type}
                                            key={index}
                                        >
                                        {type}
                                        </Dropdown.Item>
                            })}                
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Converter
