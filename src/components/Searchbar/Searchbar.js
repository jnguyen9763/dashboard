import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import styles from './Searchbar.module.css'

function Searchbar() {
    const [input, setInput] = useState('')
    const [searchEngine, setSearchEngine] = useState('google')

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = 'http://google.com/search?q=' + input
        window.open(url, '_blank')
        setInput('')
    }

    const changeSearchEngine = (e) => {
        setSearchEngine(e)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <DropdownButton
                    as={InputGroup.Prepend}
                    title={searchEngine}
                >
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Google">Google</Dropdown.Item>
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Yahoo">Yahoo</Dropdown.Item>
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Bing">Bing</Dropdown.Item>
                </DropdownButton>
                <Form.Control 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Enter and search..." 
                />
            </InputGroup>
        </Form>
    )
}

export default Searchbar
