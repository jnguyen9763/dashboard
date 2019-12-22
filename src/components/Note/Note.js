import React, { useState } from 'react'
import styles from './Note.module.css'

function Note() {
    const [note, setNote] = useState('')

    return (
        <div className={styles.Note}>
            <textarea 
                style={{resize: "None"}} 
                placeholder="Type your notes here" 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
        </div>
    )
}

export default Note
