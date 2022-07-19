import React from "react";
import { Link } from "react-router-dom";
type Props = {};

export const TutorialMissions: React.FC<Props> = () => {
  return (
    <div>
      <h1>チュートリアルミッション一覧のページ</h1>
      <Link to="/tutorial/world/:world_id/mission/:mission_id/step/:step_id">
        ミッションXのステップXに進む
      </Link>
      <Link to="/tutorial/world/:world_id/intro">
        このワールドのゲーム説明に進む
      </Link>
    </div>
  );
};
