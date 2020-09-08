import React, {Component} from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import PropTypes from 'prop-types'

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed
}

class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = { filter: 'SHOW_ALL' }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const todos = this.props.todos
    const actions = this.props.actions
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

  renderFooter(completedCount) {
    const todos= this.props.todos
    const filter = this.props.filter
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted.bind(this)}
          onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const todos = this.props.todos
    const filter = this.state.filter
    const actions = this.props.actions

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count
    }, 0)

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}

export default MainSection
