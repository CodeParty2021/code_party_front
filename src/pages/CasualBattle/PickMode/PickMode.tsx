import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CasualBattlePickMode: React.FC<Props> = () => {
  return (
    <div>
      <div>ロボットを選択する画面</div>
      <Link to="/free-coding">ロボットを調整する(フリーコーディング)</Link>
      <Link to="/casual-battle/invitation/:roomId">マッチ画面に戻る</Link>
    </div>
  );
};