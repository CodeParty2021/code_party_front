import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const ModeSelect: React.FC<Props> = () => {
  return (
    <div>
      <div>遊ぶモードを決める</div>
      <Link to="/robot-development/top">ロボット開発モード</Link>
      <Link to="/casual-battle">カジュアル対戦モード</Link>
    </div>
  );
};
