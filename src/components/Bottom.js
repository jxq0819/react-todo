/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const bottomStyle = css`
   {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  p {
    line-height: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  a:hover {
    text-decoration: underline;
  }
`;

function Bottom() {
  return (
    <bottom className="info" css={bottomStyle}>
      <p>Double-click to edit a todo</p>
      <p>
        Created by <a href="https://github.com/jxq0819/">Junxian</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </bottom>
  );
}

export default Bottom;
