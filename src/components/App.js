import React, { Component, useState } from 'react'
import Header from './Header'
import MainSection from './MainSection'
import { v4 as uuidv4 } from 'uuid'
import Bottom from './Bottom'

const initialState = [{
    text: '',
    completed: false,
    id: 0
  }
]

function App(props) {
  const [todos, setTodos] = useState(initialState)

  // const [ID, setID] = useState(uuidv4)

  const addTodo = (userInput) => {
    const newtodos = [{
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: userInput
      },
      ...todos
    ]
    setTodos(newtodos)
  }

  const deleteTodo = (id) => {
    const deltodos = todos.filter(todo => todo.id !== id)
    setTodos(deltodos)
  }

  const editTodo = (id, newtext) => {
    const edittodos = todos.map(todo =>
        todo.id === id ? {...todo, newtext} : todo
    )
    setTodos(edittodos)
  }

  const completeTodo = (id) => {
    const completetodos = todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
    setTodos(completetodos)
  }

  const completeAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed)
    const alltodos = todos.map(todo => {
      return {...todo, completed: !areAllCompleted}
    })
    setTodos(alltodos)
  }

  const clearCompleted = () => {
    const claertodos = todos.filter(todo => todo.completed === false)
    setTodos(claertodos)
  }

  const actions = {
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    editTodo: editTodo,
    completeTodo: completeTodo,
    completeAll: completeAll,
    clearCompleted: clearCompleted
  }

    return(
        <div>
          <h1>todos</h1>
          <Header addTodo={actions.addTodo} />
          <MainSection todos={todos} actions={actions} />
          <Bottom />
        </div>
    )
}

export default App
