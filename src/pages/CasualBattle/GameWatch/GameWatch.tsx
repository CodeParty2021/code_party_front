import React from "react";
import { useGameWatchState } from "./hooks/useGameWatchState";
import { useRunSimulation } from "./hooks/useRunSimulation";

type Props = {};

export const CasualBattleGameWatch: React.FC<Props> = () => {
  useRunSimulation();
  const { isAnalyzing, analyzingError, result, json, exitBtnHandler } =
    useGameWatchState();

  return (
    <div>
      <div>結果</div>
      <div>
        ステータス：
        {analyzingError
          ? "シミュレーションエラー"
          : isAnalyzing
          ? "解析中"
          : "観戦中"}
      </div>
      {result ? <div>{JSON.stringify(result)}</div> : undefined}
      {json ? <div>{json}</div> : undefined}
      <button id="exit-btn" onClick={exitBtnHandler}>
        退出
      </button>
    </div>
  );
};
