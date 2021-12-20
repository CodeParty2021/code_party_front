import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  return (
    <div>
      <h1>Top</h1>
      <ul>
        <li> <Link to="/auth">認証</Link> </li>
        <li> <Link to="/stage">ステージ</Link> </li>
      </ul>
    </div>
  );
};
