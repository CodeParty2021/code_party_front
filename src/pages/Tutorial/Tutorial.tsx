import React from "react";
import { Link } from "react-router-dom";
type Props = {};

export const Tutorial: React.FC<Props> = () => {
  return (
    <div>
      <h1>チュートリアルのステップでのコーディングページ</h1>
      <Link to="/tutorial/world/:world_id/mission/:mission_id/end">
        チュートリアルを終了する
      </Link>
    </div>
  );
};
