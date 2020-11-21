import { useState } from "react";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

const mainStyle = css`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`;

const todoListStyle = css`
   {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
  }

  li:last-child {
    border-bottom: none;
  }

  li.editing {
    border-bottom: none;
    padding: 0;
  }

  li.editing .edit {
    display: block;
    width: 506px;
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }

  li.editing .view {
    display: none;
  }

  li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none; /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
  }

  li .toggle {
    opacity: 0;
  }

  li .toggle + label {
    /*
        Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
        IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
    */
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;
  }

  li .toggle:checked + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  }

  li label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }

  li .destroy:hover {
    color: #af5b5e;
  }

  li .destroy:after {
    content: "×";
  }

  li:hover .destroy {
    display: block;
  }

  li .edit {
    display: none;
  }

  li.editing:last-child {
    margin-bottom: -1px;
  }
`;

const toggleStyle = css`
   {
    text-align: center;
    border: none; /* Mobile Safari */
    opacity: 0;
    position: absolute;
  }

  + label {
    width: 60px;
    height: 34px;
    font-size: 0;
    position: absolute;
    top: -52px;
    left: -13px;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  + label:before {
    content: "❯";
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  :checked + label:before {
    color: #737373;
  }
`;

function MainSection(props) {
  const [filter, setFilter] = useState("SHOW_ALL");

  const handleClearCompleted = () => {
    props.actions.clearCompleted();
  };

  const handleShow = (filter) => {
    setFilter(filter);
  };

  function renderToggleAll(completedCount) {
    const todos = props.todos;
    const actions = props.actions;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
          css={toggleStyle}
        />
      );
    }
  }

  function renderFooter(completedCount) {
    const todos = props.todos;
    const filter = props.filter;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={handleClearCompleted}
          onShow={handleShow}
        />
      );
    }
  }

  const todos = props.todos;
  const filters = filter;
  const actions = props.actions;
  const filteredTodos = todos.filter(TODO_FILTERS[filters]);
  const completedCount = todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count;
  }, 0);

  return (
    <section className="main" css={mainStyle}>
      {renderToggleAll(completedCount)}
      <label onClick={props.actions.completeAll} />
      <ul className="todo-list" css={todoListStyle}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...actions} />
        ))}
      </ul>
      {renderFooter(completedCount)}
    </section>
  );
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
