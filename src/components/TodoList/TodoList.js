import React, { useState } from 'react'
import styles from './TodoList.module.css'
import Form from 'react-bootstrap/Form'
import Todo from './Todo/Todo'
import uuid from 'uuid'

function TodoList() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const updateTodos = (e) => {
        e.preventDefault()
        let tempTodos = [...todos]
        tempTodos.push({
            ID: uuid.v4(),
            todo: input,
            isChecked: false
        })
        setTodos(tempTodos)
        setInput('')
    }

    const updateChecked = (ID) => {
        let tempTodos = [...todos]
        for (let i = 0; i < tempTodos.length; i++) {
            if (tempTodos[i].ID === ID) {
                tempTodos[i].isChecked = !tempTodos[i].isChecked
                setTodos(tempTodos)
                return
            }
        }
    }

    return (
        <div className={styles.TodoList}>
            <h4>To Do</h4>
            <div className={styles.Container}>
                {todos.map(({ID, todo, isChecked}) => {
                    return <Todo updateChecked={updateChecked} todo={todo} key={ID} ID={ID} isChecked={isChecked} />
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
