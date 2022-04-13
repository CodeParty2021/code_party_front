import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { useGameWatchState } from "./hooks/useGameWatchState";
import { useRunSimulation } from "./hooks/useRunSimulation";

type Props = {};
//TODO:ここstepかstageごとに変更する必要あり
const unityContext = new UnityContext({
  loaderUrl: "unity/sp/web.loader.js",
  dataUrl: "unity/sp/web.data.unityweb",
  frameworkUrl: "unity/sp/web.framework.js.unityweb",
  codeUrl: "unity/sp/web.wasm.unityweb",
});

export const CasualBattleGameWatch: React.FC<Props> = () => {
  useRunSimulation();
  const { isAnalyzing, analyzingError, result, json, exitBtnHandler } =
    useGameWatchState();
  const [progression, setProgression] = useState(0);

  const loadJson = (json: string) => {
    //unityContext.send("JSONLoader", "LoadJSON", json);
    unityContext.send("JSUnityConnector", "SetSimulationData", json);
    unityContext.send("JSUnityConnector", "LoadStage", "SquarePaint");
  };

  useEffect(() => {
    // Unityロード時にprogressionが0=>1になる
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  useEffect(() => {
    console.log(progression);
    if (progression == 1 && json) {
      window.setTimeout(() => loadJson(json), 3000);
    }
  }, [progression]);

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
      {json ? (
        <Unity
          unityContext={unityContext}
          style={{ width: "800px", height: "600px" }}
        />
      ) : undefined}

      <button id="exit-btn" onClick={exitBtnHandler}>
        退出
      </button>
    </div>
  );
};
