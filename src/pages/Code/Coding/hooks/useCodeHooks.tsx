import { useCallback, useEffect, useMemo, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import { CodeType, TurnState } from "hooks/CodeAPIHooks/useCodeAPI";
import { useUnityGame } from "hooks/UnityGameHooks/useUnityGame";
import { useCode } from "hooks/CodeHooks/useCode";
import { useResult } from "hooks/ResultHooks/useResult";
import { useDummyLoading } from "hooks/DummyLoadingHooks/useDummyLoading";
import { useMonacoEditor } from "hooks/MonacoEditorHooks/useMonacoEditor";
import { PanelState } from "../components/LogPanel/LogPanel";

export type RunResponse = {
  unityURL: string;
  jsonId: string;
};

export type CodeState = {
  /** ターンログを表示するか */
  showTurnLog: boolean;
  /** セッティング表示するか */
  showSetting: boolean;
  /**
   * 現在の表示画面を決める
   * editor: エディタ表示中
   * unity: ゲーム画面表示中
   * message: なんらかのメッセージを表示中
   * loading: ロード中
   */
  switchDisplay: "editor" | "unity" | "message" | "loading";
  /**
   * メッセージの種類を決める
   * loading: ロード中メッセージを表示
   * error: エラーメッセージを表示
   */
  messageType: "loading" | "error";
  /**
   * ボタンの種類を決める
   * hidden: 非表示
   * toEditor: 押すとエディタ画面に移動する状態
   * toGame: 押すとゲーム画面に移動する状態
   * closeInfo: 押すとメッセージを非表示にする（エディタ画面に戻る）
   * unityLoading: ユニティをロード中で押せない状態
   */
  buttonType: "hidden" | "toEditor" | "toGame" | "closeInfo" | "unityLoading";
};

const initialState: CodeState = {
  showTurnLog: false,
  showSetting: false,
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
  /** パネルを表示するか */
  showLog: boolean;
  showSetting: boolean;
  panelState: PanelState;
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
  /** パネルの開閉コールバック関数 */
  toggleLogHandler: () => void;
  toggleSettingHandler: () => void;
  closePanelHandler: () => void;
  backLinkRoute: string;
  changeStep: (step: number) => void;
};

export const useCodingState = (): IResponse => {
  // コードID取得
  const { codeId, beforePage } = useParams<string>();

  const [backLinkRoute, setBackLinkRoute] = useState<string>("");

  useEffect(() => {
    setBackLinkRoute(
      beforePage == "eventAI"
        ? "/event/select-ai"
        : beforePage == "codes"
        ? "/codes"
        : beforePage == "eventTrain"
        ? "/event/select-mode"
        : ""
    );
  }, []);

  // hooksの宣言
  const {
    codeState,
    createCodeDefault,
    updateCodeOnlyFront,
    saveCode,
    changeStep,
  } = useCode(codeId);
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
  const [showSetting, setShowSetting] = useState<CodeState["showSetting"]>(
    initialState["showSetting"]
  );
  const [switchDisplay, setSwitchDisplay] = useState<
    CodeState["switchDisplay"]
  >(initialState["switchDisplay"]);
  const [messageType, setMessageType] = useState<CodeState["messageType"]>(
    initialState["messageType"]
  );
  const [panelState, setPanelState] = useState<IResponse["panelState"]>("log");
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

  // 初期処理
  useEffect(() => {
    startDummyLoad();
    if (!codeId) {
      const codeId = createCodeDefault(1, "1");
      navigate(`/free-coding/${codeId}/`, { replace: true });
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
    if (resultState.isFailed) {
      setSwitchDisplay("message");
      setMessageType("error");
      setShowTurnLog(false);
    }
  }, [resultState.isFailed]);

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
    const codeId = codeState.code?.id;
    if (codeId) {
      await saveCode();
      await testCode(codeId);
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
   * パネルの表示切り替えコールバック
   */
  const toggleLogHandler = () => {
    setPanelState("log");
    setShowTurnLog((showLog) => !showLog);
  };
  const toggleSettingHandler = () => {
    setPanelState("setting");
    setShowSetting((showSetting) => !showSetting);
  };
  const closePanelHandler = () => {
    if (showSetting) setShowSetting(false);
    if (showTurnLog) setShowTurnLog(false);
  };
  return {
    state: {
      showTurnLog,
      switchDisplay,
      messageType,
      buttonType,
      showSetting,
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
    backLinkRoute,
    toggleSettingHandler,
    showSetting,
    closePanelHandler,
    panelState,
    changeStep,
  };
};
