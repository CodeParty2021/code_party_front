import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const RobotDevelopmentTop: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ロボット開発モードトップ画面</h1>
      <Link to="/tutorial/world/:id/missions">
        チュートリアルモードへ進む(world選択画面は画面遷移図に基づき一旦飛ばす)
      </Link>
      <Link to="/garage">ガレージモード</Link>
      <Link to="/robot-development/specification">プログラム仕様書</Link>
    </div>
  );
};
