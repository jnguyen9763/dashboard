import React, { useState } from 'react'
import styles from './Bookmark.module.css'
import Button from 'react-bootstrap/Button'
import { MdAdd } from 'react-icons/md'

function Bookmark() {
    const [link, setLink] = useState('')

    const openLink = () => {
        if (link === '') {
            const link = prompt('Enter a link you would like to bookmark')
            setLink(link)
        }
        else {
            window.open(link, '_blank')
        }
    }

    return (
        <div className="d-flex justify-content-center">
            {link === '' ? 
            <Button variant="link" onClick={openLink} className={styles.Bookmark}>
                <MdAdd />
            </Button> :
            <Button variant="link" onClick={openLink} className={styles.Link}>
                <img src={link + '/favicon.ico'} alt={link} />
            </Button>}
        </div>
    )
}

export default Bookmark
