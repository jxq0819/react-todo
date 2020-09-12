import React, { useState } from 'react'
import classnames from 'classnames'
import TodoInput from './TodoInput'
import PropTypes from 'prop-types'

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
        <button className="destroy" onClick={() => deleteTodo(todo.id)}/>
      </div>
    )
  }

  return (
    <li className={classnames({
      completed: todo.completed,
      editing: editing,
    })}>
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
