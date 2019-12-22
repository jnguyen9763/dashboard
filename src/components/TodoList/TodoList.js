import React, { useState } from 'react'
import styles from './TodoList.module.css'
import Form from 'react-bootstrap/Form'
import Todo from './Todo/Todo'

function TodoList() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const updateTodos = (e) => {
        e.preventDefault()
        let tempTodos = todos
        tempTodos.push(input)
        setInput('')
    }

    return (
        <div className={styles.TodoList}>
            <h4>To Do</h4>
            <div className={styles.Container}>
                {todos.map((todo, index) => {
                    return <Todo todo={todo} key={index} />
                })}
            </div>
            <Form onSubmit={updateTodos}>
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
