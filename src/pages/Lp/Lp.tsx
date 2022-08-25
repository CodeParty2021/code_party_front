import React from "react";
import { Background } from "pages/Event/components/Background";
import { Link } from "react-router-dom";
type Prop = {};

export const Lp: React.FC<Prop> = () => {
  return (
    <div id="overlay">
      <div id="content">
        <p>宣伝用のページです。</p>
        <Link to="/">タイトル画面に進む(Topページ)</Link>

        <Background />
      </div>
    </div>
  );
};
