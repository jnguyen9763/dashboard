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

function Searchbar() {
    const [input, setInput] = useState('')
    const [searchEngine, setSearchEngine] = useState("Google")
    const [searchEngineIcon, setSearchEngineIcon] = useState(<img src={googleLogo} alt="google search" />)

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = '';
        switch(searchEngine) {
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
        setSearchEngine(e)
        switch(e) {
            case "Google":
                setSearchEngineIcon(<img src={googleLogo} alt="google search" />)
                break;
            case "Yahoo":
                setSearchEngineIcon(<img src={yahooLogo} alt="yahoo search" />)
                break;
            case "Bing":
                setSearchEngineIcon(<img src={bingLogo} alt="bing search" />)
                break;
            default:
                setSearchEngineIcon(<img src={googleLogo} alt="google search" />)
        }
    }

    return (
        <Form onSubmit={handleSubmit} className={styles.Searchbar}>
            {searchEngineIcon}
            <DropdownButton
                id="searchEngineDropdown"
                title=""
                variant="link"
                className={styles.Dropdown}
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
            <Button type="submit" variant="link">
                <MdSearch />
            </Button>
        </Form>
    )
}

export default Searchbar
