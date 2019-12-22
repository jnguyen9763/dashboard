import React from 'react'
import styles from './Todo.module.css'
import Button from 'react-bootstrap/Button'
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'

function Todo({ todo, isChecked, ID, updateChecked }) {
    return (
        <div className={styles.Todo}>
            {!isChecked ?
            <>
                <Button 
                    className={styles.Outline} 
                    variant="link" onClick={() => updateChecked(ID)}
                >
                    <MdCheckBoxOutlineBlank />
                </Button>
                <span>{todo}</span>
            </>
             :
            <>
                <Button
                    variant="link" 
                    onClick={() => updateChecked(ID)}
                >
                    <MdCheckBox />
                </Button>
                <span className={styles.Checked}>{todo}</span>
            </>}
        </div>
    )

}

export default Todo
