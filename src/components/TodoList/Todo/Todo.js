import React, { useState } from 'react'
import styles from './Todo.module.css'
import Button from 'react-bootstrap/Button'
import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'

function Todo({ todo }) {
    const [isCheck, setIsChecked] = useState(false)
    return (
        <div className={styles.Todo}>
            {!isCheck ?
            <Button 
                className={styles.Outline} 
                variant="link" onClick={() => setIsChecked(true)}
            >
                <MdCheckBoxOutlineBlank />
                {todo}
            </Button> :
            <Button
                variant="link" 
                onClick={() => setIsChecked(false)}
            >
                <MdCheckBox />
                <span className={styles.Checked}>{todo}</span>
            </Button>}
        </div>
    )

}

export default Todo
