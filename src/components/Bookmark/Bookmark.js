import React from 'react'
import styles from './Bookmark.module.css'
import Button from 'react-bootstrap/Button'
import { MdAdd } from 'react-icons/md'

function Bookmark({ id, widget, updateWidgetData }) {

    const openLink = () => {
        if (widget === undefined) {
            const link = prompt('Enter a link you would like to bookmark')
            updateWidgetData(id, {link: link})
        }
        else {
            window.open(widget.link, '_blank')
        }
    }

    return (
        <div className={styles.Bookmark}>
            {widget === undefined ? 
            <Button variant="link" onClick={openLink} >
                <MdAdd />
            </Button> :
            <Button variant="link" onClick={openLink}>
                <img src={widget.link + '/favicon.ico'} alt={widget.link} />
            </Button>}
        </div>
    )
}

export default Bookmark
