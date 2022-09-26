import { ComponentProps, useCallback, useEffect, useMemo, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import { CodeType, TurnState } from "hooks/CodeAPIHooks/useCodeAPI";
import {
  DescriptionCMSType,
  useDescriptionCMS,
} from "hooks/DescriptionCMSHooks/useDescriptionCMS";
import { useUnityGame } from "hooks/UnityGameHooks/useUnityGame";
import { useCode } from "hooks/CodeHooks/useCode";
import { useResult } from "hooks/ResultHooks/useResult";
import { useDummyLoading } from "hooks/DummyLoadingHooks/useDummyLoading";
import { useMonacoEditor } from "hooks/MonacoEditorHooks/useMonacoEditor";
import { Message } from "../components/Message/Message";
import { Button } from "components/Button/Button";

export type RunResponse = {
  unityURL: string;
  jsonId: string;
};

export type CodeState = {
  showTurnLog: boolean;
  switchDisplay: "editor" | "unity" | "message";
  messageType: "loading" | "error";
  buttonType: "hidden" | "toEditor" | "toGame" | "closeInfo" | "unityLoading";
};

const initialState: CodeState = {
  showTurnLog: false,
  switchDisplay: "message",
  messageType: "loading",
  buttonType: "hidden",
};

export type IResponse = {
  state: CodeState;
  code?: CodeType;
  //loading: boolean;
  //execCode: () => void;
  turnLog?: TurnState[];
  handleEditorDidMount: (editor: any, _monaco: any) => void;
  buttonHandler?: () => void;
  //closeEditorButtonHandler: () => void;
  //showUnity: boolean;
  unityContext: UnityContext;
  //toggleLogHandler: () => void;
  //showLog: boolean;
  //showError: boolean;
  //description?: DescriptionCMSType;
  //unityLoad: boolean;
};

export const useCodingState = (): IResponse => {
  const { codeId } = useParams<string>(); //code_id
  const { codeState, createCodeDefault, updateCodeOnlyFront, saveCode } =
    useCode(codeId);
  const { resultState, testCode, reset } = useResult();
  const { dummyLoadingState, startDummyLoad } = useDummyLoading(5000);
  const { monacoEditorState, handleEditorDidMount } = useMonacoEditor();
  const { unityContext, unityStatus, startGame } = useUnityGame("SquarePaint");
  const { getDescriptionFromStepID } = useDescriptionCMS();

  // const [description, setDescription] = useState<
  //   DescriptionCMSType | undefined
  // >(undefined);
  const [showTurnLog, setShowTurnLog] = useState<CodeState["showTurnLog"]>(initialState["showTurnLog"]);
  const [switchDisplay, setSwitchDisplay] = useState<CodeState["switchDisplay"]>(initialState["switchDisplay"]);
  const [messageType, setMessageType] = useState<CodeState["messageType"]>(initialState["messageType"]);
  // const [showUnity, setShowUnity] = useState(false);
  // const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const loading = useMemo(
    () => dummyLoadingState.isLoading && codeState.isLoading,
    [dummyLoadingState.isLoading, codeState.isLoading]
  );

  const buttonType = useMemo<CodeState["buttonType"]>(() => (
    unityStatus.isLoading ? "unityLoading" :
    switchDisplay === "editor" ? "toGame" :
    switchDisplay === "message" ? "closeInfo" :
    switchDisplay === "unity" ? "toEditor" : "hidden"
  ), []);

  const error = useMemo(() => resultState.isFailed, [resultState.isFailed]);

  // エディタの更新をコードに反映する
  useEffect(() => {
    updateCodeOnlyFront(monacoEditorState.content);
  }, [monacoEditorState.content]);

  // 初期処理
  useEffect(() => {
    startDummyLoad();
    if (!codeId) {
      const codeId = createCodeDefault(1, "1");
      navigate(`/free-coding/${codeId}/`);
    }
  }, []);

  // コードのローディングが完了した時の処理
  // useEffect(() => {
  //   const code = codeState.code;
  //   if (!codeState.isLoading && code) {
  //     getDescriptionFromStepID(code.step).then((description) => {
  //       setDescription(description);
  //     });
  //   }
  // }, [codeState.isLoading]);

  // jsonに値が入ればunity描画、空が入ればunity非表示
  useEffect(() => {
    const simulationJson = resultState.simulationJson;
    // setShowUnity(simulationJson !== undefined);
    if (simulationJson !== undefined) {
      setSwitchDisplay("unity");
      startGame(JSON.stringify(simulationJson));
    }
  }, [resultState.simulationJson, startGame]);

  // エディターを閉じるときの処理
  const closeEditorButtonHandler = () => {
    reset();
    setSwitchDisplay("editor");
    // setShowError(false);
  };

  const execCode = useCallback(async () => {
    if (codeState && codeState.isExecutable) {
      await saveCode();
      await testCode(codeState);
    }
  }, [codeState, updateCodeOnlyFront, saveCode, testCode]);

  // ログの表示管理
  // const [showLog, setShowLog] = useState(false);

  const toggleLogHandler = () => {
    setShowTurnLog((showLog) => !showLog);
  };

  const buttonHandler = useMemo(() => (
    buttonType === "toGame" ? execCode :
    buttonType === "toEditor" || buttonType === "closeInfo" ? closeEditorButtonHandler : undefined
  ), []);

  useEffect(() => {
    if (error) {
      setSwitchDisplay("message");
      setMessageType("error");
      setShowTurnLog(false);
      // setShowError(true);
    }
  }, [error]);

  /* cmsのエラー判定を一旦コメントアウト
  useEffect(() => {
    if (error) {
      setShowUnity(false);
      setShowLog(false);
      setShowError(true);
    }
    if (errorCodeAPI) {
      setError(errorDescriptionCMS + "," + errorCodeAPI);
    } else {
      setError(errorDescriptionCMS || errorCodeAPI);
    }
  }, [error, errorDescriptionCMS, errorCodeAPI]);
  */
  return {
    state: {
      showTurnLog,
      switchDisplay,
      messageType,
      buttonType,
    },
    code: codeState.code,
    // description,
    // loading,
    // execCode,
    turnLog: resultState.simulationJson?.turn,
    handleEditorDidMount,
    // closeEditorButtonHandler,
    buttonHandler,
    // showUnity,
    unityContext,
    // toggleLogHandler,
    // showLog,
    // showError,
    // unityLoad: unityStatus.isLoading,
  };
};
