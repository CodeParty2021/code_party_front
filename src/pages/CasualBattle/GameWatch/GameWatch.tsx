import React from "react";
import { useGameWatchState } from "./hooks/useGameWatchState";

type Props = {};

export const CasualBattleGameWatch: React.FC<Props> = () => {
  const {isAnalysing, exitBtnHandler} = useGameWatchState();
  return (
    <div>
      <div>結果</div>
      <div>
        {isAnalysing ? "解析中" : "観戦中"}
      </div>
      <button onClick={exitBtnHandler}>退出</button>
    </div>
  );
};
