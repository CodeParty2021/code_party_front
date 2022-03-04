import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CodeList: React.FC<Props> = () => {
  return (
    <div>
      <div>コードリスト</div>
      <ul>
        <li>
          コードA <Link to="/free-cording">編集</Link>
        </li>
        <li>
          コードB <Link to="/free-cording">編集</Link>
        </li>
        <li>
          コードC <Link to="/free-cording">編集</Link>
        </li>
      </ul>
      <div>
        <Link to="/codes"></Link>
      </div>
    </div>
  );
};
