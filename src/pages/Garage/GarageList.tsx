import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const GarageList: React.FC<Prop> = () => {
  return (
    <div>
      <h1>ガレージ画面</h1>
      <h1>ロボットの新規作成</h1>
      <h1>ここにロボットが並んで選択できる</h1>
      <Link to="/garage/:id">ロボットの詳細を表示する(リンクの例)</Link>
    </div>
  );
};