import React, { useState } from 'react'
import Header from './Header'
import MainSection from './MainSection'
import Bottom from './Bottom'
import { v4 as uuidv4 } from 'uuid'
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'

const todoappStyle = css`
{
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
`

function App () {
  const [todos, setTodos] = useState([
    {
      id: null,
      text: null,
      completed: null,
    }])

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
      <Global styles={css`
        body {
          margin: 0;
          padding: 0;
          }
          
        button {
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          font-size: 100%;
          vertical-align: baseline;
          font-family: inherit;
          font-weight: inherit;
          color: inherit;
          -webkit-appearance: none;
          appearance: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
          
        body {
          font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.4em;
          background: #f5f5f5;
          color: #4d4d4d;
          min-width: 230px;
          max-width: 550px;
          margin: 0 auto;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-weight: 300;
          }
          
        :focus {
          outline: 0;
          }
      `
      }/>
      <section className='todoapp' css={todoappStyle}>
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
