import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  return (
    <div>
      <h1>開発用のTopページ</h1>
      <p>ここに各ページのリンクを作ると便利</p>
      <ul>
        <li>
          {" "}
          <Link to="/auth">認証</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/stage">ステージ</Link>{" "}
        </li>
        <li>
          <Link to="/start">スタート画面</Link>
        </li>
        <li>
          <Link to="/login">ログイン画面</Link>
        </li>
      </ul>
    </div>
  );
};
