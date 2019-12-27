import React, { useState } from 'react'
import styles from './TodoList.module.css'
import Form from 'react-bootstrap/Form'
import Todo from './Todo/Todo'
import uuid from 'uuid'

function TodoList({ id, widget, updateWidgetData }) {
    const [input, setInput] = useState('')

    const updateTodos = e => {
        e.preventDefault()
        let tempTodos = []
        if (widget !== undefined) tempTodos = [...widget.todos] 
        tempTodos.push({
            ID: uuid.v4(),
            todo: input,
            isChecked: false
        })
        if (updateWidgetData !== undefined) updateWidgetData(id, {todos: tempTodos})
        setInput('')
    }

    const updateChecked = ID => {
        let tempTodos = [...widget.todos]
        for (let i = 0; i < tempTodos.length; i++) {
            if (tempTodos[i].ID === ID) {
                tempTodos[i].isChecked = !tempTodos[i].isChecked
                updateWidgetData(id, {todos: tempTodos})
                return
            }
        }
    }

    const deleteTodo = ID => {
        let tempTodos = [...widget.todos]
        for (let i = 0; i < tempTodos.length; i++) {
            if (tempTodos[i].ID === ID) {
                tempTodos.splice(i, 1)
                updateWidgetData(id, {todos: tempTodos})
                return
            }
        }
    }

    return (
        <div className={styles.TodoList}>
            <h4>To Do</h4>
            <div className={styles.Container}>
                {widget !== undefined && widget.todos.map(({ID, todo, isChecked}) => {
                    return <Todo
                        deleteTodo={deleteTodo} 
                        updateChecked={updateChecked} 
                        todo={todo} 
                        key={ID} 
                        ID={ID} 
                        isChecked={isChecked} 
                    />
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
