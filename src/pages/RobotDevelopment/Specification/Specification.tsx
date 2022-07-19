import React from "react";
import { Link } from "react-router-dom";
type Prop = {};

export const Specification: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ロボットの設計仕様書</h1>
      <Link to="/robot-development/top">
        ロボット開発モードのトップ画面に戻る
      </Link>
    </div>
  );
};
