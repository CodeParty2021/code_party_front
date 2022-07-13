import React from "react";
import { Link } from "react-router-dom";
type Props = {};

export const MissionEnd: React.FC<Props> = () => {
  return (
    <div>
      <h1>ミッション終了画面</h1>
      <Link to="/tutorial/world/:id/missions">ミッション一覧に戻る</Link>
    </div>
  );
};
