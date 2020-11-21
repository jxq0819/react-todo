import classnames from "classnames";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const FILTER_TITLES = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

const footerStyle = css`
   {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }

  :before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`;

const filterStyle = css`
{
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

li {
  display: inline;
}

li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

li a.selected {
  bor
`;

const todoCountStyle = css`
   {
    float: left;
    text-align: left;
  }

  strong {
    font-weight: 300;
  }
`;

const clearCompletedStyle = css`
   {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  :hover {
    text-decoration: underline;
  }
`;

function Footer(props) {
  function renderTodoCount() {
    const activeCount = props.activeCount;

    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span className="todo-count" css={todoCountStyle}>
        <strong>{(activeCount || "No") + " "}</strong>
        {itemWord} left
      </span>
    );
  }

  function renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = props;

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: "pointer" }}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  function renderClearButton() {
    const { completedCount, onClearCompleted } = props;
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
          css={clearCompletedStyle}
        >
          Clear completed
        </button>
      );
    }
  }

  function renderFilterList() {
    return ["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"].map((filter) => (
      <li key={filter}>{renderFilterLink(filter)}</li>
    ));
  }

  return (
    <footer className="footer" css={footerStyle}>
      {renderTodoCount()}
      <ul className="filters" css={filterStyle}>
        {renderFilterList()}
      </ul>
      {renderClearButton()}
    </footer>
  );
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default Footer;
