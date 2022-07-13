import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const Garage: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ロボットのステータスが出る</h1>
      <Link to="/free-coding">フリーコーディングへの遷移(ロボットの編集)</Link>
    </div>
  );
};
