import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CasualBattleResult: React.FC<Props> = () => {
  return (
    <div>
      <div>結果</div>
      <div>aaa</div>
      <div>
        <Link to="/casual-battle/waiting-room">ロビーに戻る</Link>
      </div>
    </div>
  );
};
