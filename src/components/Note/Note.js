import React from 'react'
import styles from './Note.module.css'

function Note({ id, widget, updateWidgetData }) {

    const updateNote = (note) => {
        if (updateWidgetData !== undefined) {
            console.log('update note')
            updateWidgetData(id, {note: note})
        }
    }

    return (
        <div className={styles.Note}>
            <textarea 
                style={{resize: "None"}} 
                placeholder="Type your notes here" 
                value={widget === undefined ? '' : widget.note} 
                onChange={(e) => updateNote(e.target.value)}
            ></textarea>
        </div>
    )
}

export default Note
