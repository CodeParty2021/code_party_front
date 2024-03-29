import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export const RoomMatchPickCode: React.FC<Props> = () => {
  return (
    <div>
      <div>ロボットを選択する画面</div>
      <Link to="/room-match/invitation/:roomId">マッチ画面に戻る</Link>
    </div>
  );
};
