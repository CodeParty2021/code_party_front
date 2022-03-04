import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CasualBattleLobby: React.FC<Props> = () => {
  return (
    <div>
      <div>ルーム待機画面</div>
      <Link to="/casual-battle/waiting-room">ルームを建てる</Link>
      <Link to="/casual-battle/search-room">ルームを探す</Link>
    </div>
  );
};
