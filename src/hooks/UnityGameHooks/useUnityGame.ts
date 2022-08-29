import { useCallback, useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";

export type IResponse = {
  /**
   * Unityコンポーネントで埋め込むコンテキスト
   */
  unityContext: UnityContext,
  /**
   * Unityの状態
   */
  unityStatus: UnityStatus;
  /**
   * シミュレーションを実行する
   */
  startGame: (simulationJson: string) => void;
};

export type UnityStatus = {
  /**
   * Unityがロード中かどうか
   */
  isLoading: boolean;
  /**
   * Unityのロード進行度
   */
  loadingProgression: number;
  /**
   * Unityのシーンが実行中かどうか
   * startGameが実行されてから最終ターンが呼ばれるまでtrue
   */
  isRunning: boolean;
  /**
   * Unityで実行中のゲーム
   */
  gameType: "SquarePaint";
};

const initUnityStatus: UnityStatus = {
  isLoading: true,
  loadingProgression: 0,
  isRunning: false,
  gameType: "SquarePaint",
};

//TODO: ここstepかstageごとに変更する必要あり
const unityContext = new UnityContext({
  loaderUrl: "/unity/sp/web.loader.js",
  dataUrl: "/unity/sp/web.data",
  frameworkUrl: "/unity/sp/web.framework.js",
  codeUrl: "/unity/sp/web.wasm",
});

/**
 * Unityを取り扱うフック
 */
export const useUnityGame = (
  /**
   * Unityで実行するゲームタイプ
   */
  gameType: UnityStatus["gameType"],
  /**
   * Unityがロードされたタイミングで呼ばれるコールバック関数
   */
  onLoading: () => void,
  /**
  * Unityのゲームが終了したタイミングで呼ばれるコールバック関数
  */
  onGameOver: () => void,
): IResponse => {
  const [unityStatus, setUnityStatus] = useState<UnityStatus>({
    ...initUnityStatus,
    gameType,
  });

  // コンストラクタ
  useEffect(() => {
    unityContext.on("progress", function (progression) {
      setUnityStatus(current => ({
        ...current,
        loadingProgression: progression
      }));

    });

    unityContext.on("OnLoad", function () {
      setUnityStatus(current => ({
        ...current,
        isLoading: false,
      }));
      onLoading();
    });

    unityContext.on("GameOver", function () {
      setUnityStatus(current => ({
        ...current,
        isRunning: false,
      }));
      onGameOver();
    });
  }, []);

  const startGame = useCallback<IResponse["startGame"]>((json) => {
    // 状態変化
    setUnityStatus(current => ({
      ...current,
      isRunning: true,
    }));

    // 実行
    unityContext.send("ReactUnityConnector", "SetSimulationData", json);
    unityContext.send("ReactUnityConnector", "LoadStage", "SquarePaint");
  }, []);

  return {
    unityContext,
    unityStatus,
    startGame,
  };
};
