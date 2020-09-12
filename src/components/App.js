import React, { useState } from 'react'
import Header from './Header'
import MainSection from './MainSection'
import Bottom from './Bottom'
import { v4 as uuidv4 } from 'uuid'

const initialState = [
  {
    id: null,
    text: null,
    completed: null,
  }]

function App () {
  const [todos, setTodos] = useState(initialState)

  const addTodo = (text) => {
    const addtodos = [
      {
        id: uuidv4(),
        completed: false,
        text: text,
      }, ...todos]
    setTodos(addtodos)
  }

  const deleteTodo = (id) => {
    const deltodos = todos.filter(todo => todo.id !== id)
    setTodos(deltodos)
  }

  const editTodo = (id, text) => {
    const edittodos = todos.map(
      function (todo) {
        if (todo.id === id) {
          todo.text = text
        }
        return todo
      },
    )
    setTodos(edittodos)
  }

  const completeTodo = (id) => {
    const completetodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    )
    setTodos(completetodos)
  }

  const completeAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed)
    const alltodos = todos.map(todo => {
      return { ...todo, completed: !areAllCompleted }
    })
    setTodos(alltodos)
  }

  const clearCompleted = () => {
    const cleartodos = todos.filter(todo => todo.completed === false)
    setTodos(cleartodos)
  }

  const actions = {
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    editTodo: editTodo,
    completeTodo: completeTodo,
    completeAll: completeAll,
    clearCompleted: clearCompleted,
  }

  return (
    <div className='app'>
      <section className='todoapp'>
        <h1>todos</h1>
        <Header addTodo={actions.addTodo}/>
        <MainSection todos={todos.filter(todo => todo.id !== null)}
                     actions={actions}/>
      </section>
      <Bottom/>
    </div>
  )
}

export default App
