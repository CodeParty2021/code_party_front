import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CasualBattleSearchRoom: React.FC<Props> = () => {
  return (
    <div>
      <div>ルームIDを入力する</div>
      <input></input>
      <div>
        <Link to="/casual-battle/waiting-room">ルームに入る</Link>
      </div>
    </div>
  );
};
