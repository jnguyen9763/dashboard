import React, { useState } from 'react'
import styles from './TodoList.module.css'
import Form from 'react-bootstrap/Form'
import Todo from './Todo/Todo'

function TodoList() {
    const [input, setInput] = useState('')

    return (
        <div className={styles.TodoList}>
            <h4>Todos</h4>
            <div className={styles.Container}>
                <Todo todo="Practice test" />
                <Todo todo="Practice test" />
            </div>
            <Form>
                <Form.Control 
                    type="text" 
                    size="sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Enter a todo here"
                />
            </Form>
        </div>
    )
}

export default TodoList
