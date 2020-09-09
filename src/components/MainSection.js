import React, { useState } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import PropTypes from 'prop-types'

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed
}

function MainSection(props) {

  const [filter, setFilter] = useState('SHOW_ALL')

  const handleClearCompleted = () => {
    props.actions.clearCompleted()
  }

  const handleShow = filter => {
    setFilter(filter)
  }

  function renderToggleAll(completedCount) {
    const todos = props.todos
    const actions = props.actions
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      )
    }
  }

  function renderFooter(completedCount) {
    const todos= props.todos
    const filter = props.filter
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={handleClearCompleted}
          onShow={handleShow} />
      )
    }
  }

  const todos = props.todos
  const filters = filter
  const actions = props.actions
  const filteredTodos = todos.filter(TODO_FILTERS[filters])
  const completedCount = todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count
  }, 0)

  return (
    <section className="main">
      {renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...actions} />
        )}
      </ul>
      {renderFooter(completedCount)}
    </section>
  )
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
