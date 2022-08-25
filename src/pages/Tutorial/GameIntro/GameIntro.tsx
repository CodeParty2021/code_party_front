import React from "react";
import { Link } from "react-router-dom";
type Props = {};

export const GameIntro: React.FC<Props> = () => {
  return (
    <div>
      <h1>ワールドの説明画面 動画でゲームの概要が説明できる</h1>
      <Link to="/tutorial/world/:world_id/mission/:mission_id/step/:step_id">
        ミッションのコーディング画面に進む
      </Link>
    </div>
  );
};
