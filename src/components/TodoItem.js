import React, { useState } from 'react'
import classnames from 'classnames'
import TodoInput from './TodoInput'
import PropTypes from 'prop-types'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const todoItemStyle = css`
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
 }
 
 .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
 }
`
const detoryStyle = css`
  {
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
`

function TodoItem (props) {
  const [editing, setEditing] = useState(false)

  const handleDoubleClick = () => {
    setEditing(true)
  }

  const handleSave = (id, text) => {
    if (text.length === 0) {
      props.deleteTodo(id)
    } else {
      props.editTodo(id, text)
    }
    setEditing(false)
  }

  const { todo, completeTodo, deleteTodo } = props

  let element
  if (editing) {
    element = (
      <TodoInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    )

  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)}
                css={detoryStyle}/>
      </div>
    )
  }

  return (
    <li className={classnames({
      completed: todo.completed,
      editing: editing,
    })} css={todoItemStyle}>
      {element}
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoItem
