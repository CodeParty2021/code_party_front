import React from "react";
import { useNavigate } from "react-router-dom";
type Prop = {};

export const Error: React.FC<Prop> = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>エラーが発生しました。</h1>
      <button onClick={() => navigate("/")}></button>
    </div>
  );
};
