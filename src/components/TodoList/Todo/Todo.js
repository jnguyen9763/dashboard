import React from 'react'
import styles from './Todo.module.css'
import Button from 'react-bootstrap/Button'
import {MdCheckBox, MdCheckBoxOutlineBlank, MdDelete} from 'react-icons/md'

function Todo({ todo, isChecked, ID, updateChecked, deleteTodo }) {
    return (
        <div className={styles.Todo}>
            {!isChecked ?
            <div>
                <Button 
                    className={styles.Outline} 
                    variant="link" onClick={() => updateChecked(ID)}
                >
                    <MdCheckBoxOutlineBlank />
                </Button>
                <span>{todo}</span>
            </div>
             :
            <div>
                <Button
                    variant="link" 
                    onClick={() => updateChecked(ID)}
                >
                    <MdCheckBox />
                </Button>
                <span className={styles.Checked}>{todo}</span>
            </div>}
            <Button variant="link" onClick={() => deleteTodo(ID)}>
                <MdDelete className={styles.Delete} />
            </Button>
        </div>
    )

}

export default Todo
