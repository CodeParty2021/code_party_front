import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const GarageList: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ガレージ画面</h1>
      <div>ロボットの新規作成画面 ここにロボットが並んで選択できる</div>
      <Link to="/garage/:id">ロボットの詳細を表示する(リンクの例)</Link>
    </div>
  );
};
