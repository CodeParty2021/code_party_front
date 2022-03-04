import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const ModeSelect: React.FC<Props> = () => {
  return (
    <div>
      <div>遊ぶモードを決める</div>
      <Link to="/stages">チュートリアルモード</Link>
      <Link to="/codes">ガレージモード</Link>
      <Link to="/casual-battle">カジュアル対戦モード</Link>
    </div>
  );
};
