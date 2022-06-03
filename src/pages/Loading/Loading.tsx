import React from "react";
import { Background } from "pages/Event/components/Background";
type Prop = {};

export const Loading: React.FC<Prop> = () => {
  return (
    <div id="overlay">
      <div id="content">
        <p>ロード中です。</p>
        <Background />
      </div>
    </div>
  );
};