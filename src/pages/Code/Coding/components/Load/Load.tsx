import React from "react";


type Prop = {};

export const Load: React.FC<Prop> = () => {
  return (
    <div id="overlay">
      <div id="content">
        <p>ロード中です。</p>
      </div>
    </div>
  );
};