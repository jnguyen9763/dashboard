import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './Searchbar.module.css'
import { MdSearch } from 'react-icons/md'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import googleLogo from '../../assets/images/google.png'
import yahooLogo from '../../assets/images/yahoo.png'
import bingLogo from '../../assets/images/bing.png'

function Searchbar({ searchEngine, updateEngine }) {
    const [input, setInput] = useState('')
    const [engine, setEngine] = useState(searchEngine)
    let logo = googleLogo
    if (searchEngine === 'Yahoo') logo = yahooLogo
    if (searchEngine === 'Bing') logo = bingLogo
    const [searchEngineIcon, setSearchEngineIcon] = useState(logo)

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = '';
        switch(engine) {
            case "Google":
                url += 'http://google.com/search?q='
                break;
            case "Yahoo":
                url += 'http://search.yahoo.com/search?q='
                break;
            case "Bing":
                url += 'http://bing.com/search?q='
                break;
            default:
                url += 'http://google.com/search?q='
        }
        window.open(url + input, '_blank')
        setInput('')
    }

    const changeSearchEngine = (e) => {
        setEngine(e)
        updateEngine(e)
        switch(e) {
            case "Google":
                setSearchEngineIcon(googleLogo)
                break;
            case "Yahoo":
                setSearchEngineIcon(yahooLogo)
                break;
            case "Bing":
                setSearchEngineIcon(bingLogo)
                break;
            default:
                setSearchEngineIcon(googleLogo)
        }
    }

    return (
        <Form onSubmit={handleSubmit} className={styles.Searchbar}>
            <img src={searchEngineIcon} alt="search engine" />
            <DropdownButton
                id="searchEngineDropdown"
                title=""
                variant="link"
                className={styles.Dropdown}
            >
                <Dropdown.Item onSelect={changeSearchEngine} eventKey="Google">Google Search</Dropdown.Item>
                <Dropdown.Item onSelect={changeSearchEngine} eventKey="Yahoo">Yahoo Search</Dropdown.Item>
                <Dropdown.Item onSelect={changeSearchEngine} eventKey="Bing">Bing Search</Dropdown.Item>
            </DropdownButton>
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
