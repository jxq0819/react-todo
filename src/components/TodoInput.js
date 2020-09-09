import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function TodoInput(props) {

  const [text, setText] = useState(props.text || '')

  const handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.key === 'Enter') {
      props.onSave(text)
      if (props.newTodo) {
        setText('')
      }
    }
  }

  const handleChange = e => {
    setText(e.target.value)
  }

  const handleBlur = e => {
    if (!props.newTodo) {
      props.onSave(e.target.value)
    }
  }

  return (
    <input className={
      classnames({
        edit: props.editing,
        'new-todo': props.newTodo
      })}
         type="text"
         placeholder={props.placeholder}
         autoFocus="true"
         value={text}
         onBlur={handleBlur}
         onChange={handleChange}
         onKeyDown={handleSubmit} />
  )
}

TodoInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
}

export default TodoInput
