import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
}

function Footer (props) {

  function renderTodoCount () {
    const activeCount = props.activeCount

    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{(activeCount || 'No') + ' '}</strong>
        {itemWord} left
      </span>
    )
  }

  function renderFilterLink (filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = props

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  function renderClearButton () {
    const { completedCount, onClearCompleted } = props
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )
    }
  }

  function renderFilterList () {
    return ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map(filter =>
      <li key={filter}>
        {renderFilterLink(filter)}
      </li>,
    )
  }

  return (
    <footer className="footer">
      {renderTodoCount()}
      <ul className="filters">
        {renderFilterList()}
      </ul>
      {renderClearButton()}
    </footer>
  )
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
}

export default Footer
