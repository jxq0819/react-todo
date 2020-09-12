import React from 'react'
import TodoTextInput from './TodoInput'
import PropTypes from 'prop-types'

const Header = ({ addTodo }) => {
  const handleSave = text => {
    if (text.length !== 0) {
      addTodo(text)
    }
  }

  return (
    <header className="header">
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default Header
