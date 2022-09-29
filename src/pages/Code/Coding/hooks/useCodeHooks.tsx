import { useCallback, useEffect, useMemo, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import { CodeType, TurnState } from "hooks/CodeAPIHooks/useCodeAPI";
import { useUnityGame } from "hooks/UnityGameHooks/useUnityGame";
import { useCode } from "hooks/CodeHooks/useCode";
import { useResult } from "hooks/ResultHooks/useResult";
import { useDummyLoading } from "hooks/DummyLoadingHooks/useDummyLoading";
import { useMonacoEditor } from "hooks/MonacoEditorHooks/useMonacoEditor";

export type RunResponse = {
  unityURL: string;
  jsonId: string;
};

export type CodeState = {
  /** ターンログを表示するか */
  showTurnLog: boolean;
  /** 現在の表示画面を決める */
  switchDisplay: "editor" | "unity" | "message" | "loading";
  /** メッセージの種類を決める */
  messageType: "loading" | "error";
  /** ボタンの種類を決める */
  buttonType: "hidden" | "toEditor" | "toGame" | "closeInfo" | "unityLoading";
};

const initialState: CodeState = {
  showTurnLog: false,
  switchDisplay: "loading",
  messageType: "loading",
  buttonType: "hidden",
};

export type IResponse = {
  // 状態変数
  /** ページの状態 */
  state: CodeState;

  // 状態変数を扱いやすくしたもの
  /** ページがロード中か */
  loading: boolean;
  /** Unityを表示するか */
  showUnity: boolean;
  /** ログを表示するか */
  showLog: boolean;
  /** メッセージを表示するか */
  showMessage: boolean;

  // データ
  /** コード内容 */
  code?: CodeType;
  /** ターン毎に出力されたログ */
  turnLog?: TurnState[];
  /** Editorへの参照 */
  handleEditorDidMount: (editor: any, _monaco: any) => void;
  /** unityへの参照 */
  unityContext: UnityContext;

  // コールバック関数
  /** ボタン押下時のコールバック関数 */
  buttonHandler?: () => void;
  /** ログの開閉コールバック関数 */
  toggleLogHandler: () => void;
};

export const useCodingState = (): IResponse => {
  // コードID取得
  const { codeId } = useParams<string>();

  // hooksの宣言
  const { codeState, createCodeDefault, updateCodeOnlyFront, saveCode } =
    useCode(codeId);
  const { resultState, testCode, reset } = useResult();
  const { dummyLoadingState, startDummyLoad } = useDummyLoading(5000);
  const { monacoEditorState, handleEditorDidMount } = useMonacoEditor();
  const { unityContext, unityStatus, startGame } = useUnityGame("SquarePaint");

  // エディタの更新をコードに反映する
  useEffect(() => {
    updateCodeOnlyFront(monacoEditorState.content);
  }, [monacoEditorState.content]);

  // 状態の宣言
  const [showTurnLog, setShowTurnLog] = useState<CodeState["showTurnLog"]>(
    initialState["showTurnLog"]
  );
  const [switchDisplay, setSwitchDisplay] = useState<
    CodeState["switchDisplay"]
  >(initialState["switchDisplay"]);
  const [messageType, setMessageType] = useState<CodeState["messageType"]>(
    initialState["messageType"]
  );

  // その他
  const navigate = useNavigate();

  // 状態から定義できる変数の宣言
  /** ページがロード中か */
  const loading = useMemo(
    () => dummyLoadingState.isLoading || codeState.isLoading,
    [dummyLoadingState.isLoading, codeState.isLoading]
  );
  /** 表示するボタンの種類 */
  const buttonType = useMemo<CodeState["buttonType"]>(
    () =>
      unityStatus.isLoading
        ? "unityLoading"
        : switchDisplay === "editor"
        ? "toGame"
        : switchDisplay === "message"
        ? "closeInfo"
        : switchDisplay === "unity"
        ? "toEditor"
        : "hidden",
    [unityStatus.isLoading, switchDisplay]
  );
  /** シミュレーションが失敗したかどうか */
  const error = useMemo(() => resultState.isFailed, [resultState.isFailed]);

  // 初期処理
  useEffect(() => {
    startDummyLoad();
    if (!codeId) {
      const codeId = createCodeDefault(1, "1");
      navigate(`/free-coding/${codeId}/`);
    }
  }, []);

  // ローディング後の切り替え処理
  useEffect(() => {
    if (!loading) {
      setSwitchDisplay("editor");
    }
  }, [loading]);

  // エラー時の処理
  useEffect(() => {
    if (error) {
      setSwitchDisplay("message");
      setMessageType("error");
      setShowTurnLog(false);
    }
  }, [error]);

  // jsonに値が入ればunity描画、空が入ればunity非表示
  useEffect(() => {
    const simulationJson = resultState.simulationJson;
    if (simulationJson !== undefined) {
      setSwitchDisplay("unity");
      startGame(JSON.stringify(simulationJson));
    }
  }, [resultState.simulationJson, startGame]);

  /**
   * エディターに切り替える際の処理
   */
  const toEditorButtonHandler = () => {
    // Resultをリセットして、再度Unityに遷移しないようにする
    reset();
    setSwitchDisplay("editor");
  };

  /**
   * コードを実行する
   * ゲーム画面への遷移は、Resultが更新されたタイミングで遷移
   */
  const execCode = useCallback(async () => {
    if (codeState && codeState.isExecutable) {
      await saveCode();
      await testCode(codeState);
    }
  }, [codeState, updateCodeOnlyFront, saveCode, testCode]);

  /**
   * ボタンを押した時のコールバック
   */
  const buttonHandler = useMemo(
    () =>
      buttonType === "toGame"
        ? execCode
        : buttonType === "toEditor" || buttonType === "closeInfo"
        ? toEditorButtonHandler
        : undefined,
    [buttonType, execCode, toEditorButtonHandler]
  );

  /**
   * ログの表示切り替えコールバック
   */
  const toggleLogHandler = () => {
    setShowTurnLog((showLog) => !showLog);
  };

  return {
    state: {
      showTurnLog,
      switchDisplay,
      messageType,
      buttonType,
    },
    loading,
    showUnity: switchDisplay === "unity",
    showLog: showTurnLog,
    showMessage: switchDisplay === "message" || loading,
    code: codeState.code,
    turnLog: resultState.simulationJson?.turn,
    handleEditorDidMount,
    unityContext,
    buttonHandler,
    toggleLogHandler,
  };
};
