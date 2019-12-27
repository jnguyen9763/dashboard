import React from 'react'
import styles from './Note.module.css'

function Note({ id, note, updateWidgetData }) {
    return (
        <div className={styles.Note}>
            <textarea 
                style={{resize: "None"}} 
                placeholder="Type your notes here" 
                value={note} 
                onChange={(e) => updateWidgetData(id, {note: e.target.value})}
            ></textarea>
        </div>
    )
}

export default Note
