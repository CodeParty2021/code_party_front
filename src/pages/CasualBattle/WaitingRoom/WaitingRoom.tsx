import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const CasualBattleWaitingRoom: React.FC<Props> = () => {
  return (
    <div>
      <div>ルーム待機画面</div>
      <div>
        <button>コード選択</button>
        <Link to="/running">マッチ開始</Link>
      </div>
      <button>準備完了</button>
    </div>
  );
};
