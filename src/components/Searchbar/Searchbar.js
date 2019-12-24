import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import styles from './Searchbar.module.css'
import googleLogo from '../../assets/images/google.png'
import yahooLogo from '../../assets/images/yahoo.png'
import bingLogo from '../../assets/images/bing.png'

function Searchbar() {
    const googleIcon = <img src={googleLogo} height="16" width="16" alt="google icon" />;
    const yahooIcon = <img src={yahooLogo} height="16" width="16" alt="yahoo icon" />;
    const bingIcon = <img src={bingLogo} height="16" width="16"alt="bing icon" />;
    const [input, setInput] = useState('')
    const [searchEngine, setSearchEngine] = useState("Google")
    const [searchEngineIcon, setSearchEngineIcon] = useState(googleIcon)

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = '';
        switch(searchEngine) {
            case "Google":
                url += 'http://google.com/search?q=';
                break;
            case "Yahoo":
                url += 'http://search.yahoo.com/search?q=';
                break;
            case "Bing":
                url += 'http://bing.com/search?q=';
                break;
            default:
                url += 'http://google.com/search?q=';
        }
        window.open(url + input, '_blank')
        setInput('')
    }

    const changeSearchEngine = (e) => {
        setSearchEngine(e)
        switch(e) {
            case "Google":
                setSearchEngineIcon(googleIcon);
                break;
            case "Yahoo":
                setSearchEngineIcon(yahooIcon);
                break;
            case "Bing":
                setSearchEngineIcon(bingIcon);
                break;
            default:
                setSearchEngineIcon(googleIcon);
        }
    }

    return (
        <Form onSubmit={handleSubmit} className={styles.Searchbar}>
            <InputGroup>
                <DropdownButton
                    id="searchEngineDropdown"
                    as={InputGroup.Prepend}
                    title={searchEngineIcon}
                    variant="dark"
                >
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Google">{googleIcon}{' '}- Google</Dropdown.Item>
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Yahoo">{yahooIcon}{' '}- Yahoo</Dropdown.Item>
                    <Dropdown.Item onSelect={changeSearchEngine} eventKey="Bing">{bingIcon}{' '}- Bing</Dropdown.Item>
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
