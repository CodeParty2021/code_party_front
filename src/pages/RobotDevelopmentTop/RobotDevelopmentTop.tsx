import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const RobotDevelopmentTop: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ロボット開発モードトップ画面</h1>
      <Link to="/stages">チュートリアルモード</Link>
      <Link to="/codes">ガレージモード</Link>
    </div>
  );
};