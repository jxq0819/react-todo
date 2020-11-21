import { useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const newtodoStyle = css`
   {
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

   {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
`;

function TodoInput(props) {
  const [text, setText] = useState(props.text || "");

  const handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.key === "Enter") {
      props.onSave(text);
      if (props.newTodo) {
        setText("");
      }
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = (e) => {
    if (!props.newTodo) {
      props.onSave(e.target.value);
    }
  };

  return (
    <input
      className={classnames({
        edit: props.editing,
        "new-todo": props.newTodo,
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus="true"
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
      css={newtodoStyle}
    />
  );
}

TodoInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

export default TodoInput;
