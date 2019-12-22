import React from 'react'
import styles from './Note.module.css'

function Note() {
    return (
        <div className={styles.Note}>
            <textarea style={{resize: "None"}}></textarea>
        </div>
    )
}

export default Note
