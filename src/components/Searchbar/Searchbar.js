import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './Searchbar.module.css'
import { MdSearch } from 'react-icons/md'
import googleLogo from '../../assets/images/google.png'

function Searchbar() {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = 'http://google.com/search?q='
        window.open(url + input, '_blank')
        setInput('')
    }

    return (
        <Form onSubmit={handleSubmit} className={styles.Searchbar}>
            <img src={googleLogo} alt="google" />
            <Form.Control 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder="Enter and search..." 
            />
            <Button type="submit" variant="link">
                <MdSearch />
            </Button>
        </Form>
    )
}

export default Searchbar
