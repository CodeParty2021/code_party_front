import React, { useEffect, useRef, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import { useCodeAPI, CodeType, TurnState } from "hooks/CodeAPIHooks/useCodeAPI";
import {
  DescriptionCMSType,
  useDescriptionCMS,
} from "hooks/DescriptionCMSHooks/useDescriptionCMS";
import { useUnityGame } from "hooks/UnityGameHooks/useUnityGame";

export type RunResponse = {
  unityURL: string;
  jsonId: string;
};

export type IResponse = {
  code: CodeType;
  error: string | undefined;
  loading: boolean;
  isCode: (code: CodeType | undefined) => boolean;
  execCode: (content: string, step: string, language: string) => void;
  turnLog: TurnState[];
  handleEditorDidMount: (editor: any, _monaco: any) => void;
  closeEditorButtonHandler: () => void;
  showUnity: boolean;
  unityContext: UnityContext;
  toggleLogHandler: () => void;
  showLog: boolean;
  showError: boolean;
  description: DescriptionCMSType;
  unityLoad: boolean;
};

export const useCodingState = () => {
  const { codeId } = useParams<string>(); //code_id
  const {
    error: errorCodeAPI,
    getCode,
    updateCode,
    createCode,
    testCode,
  } = useCodeAPI(); //api通信用カスタムフック
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [json, setJson] = useState<string>("");
  const [turnLog, setTurnLog] = useState<TurnState[]>([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  //const { error: errorDescriptionCMS, getDescriptionFromStepID } =useDescriptionCMS();

  const { getDescriptionFromStepID } = useDescriptionCMS();
  const [code, setCode] = useState<CodeType>(); //表示中のコード
  //code の型ガード
  function isCode(code: CodeType | undefined): code is CodeType {
    return code?.id !== undefined;
  }
  const [description, setDescription] = useState<
    DescriptionCMSType | undefined
  >(undefined);
  //code, Descriptionの更新
  useEffect(() => {
    const loadCode = async () => {
      setLoading(true);
      if (codeId) {
        const code = await getCode(codeId as string); //TODO エラー処理
        setCode(code);
        const description = await getDescriptionFromStepID(code.step);
        setDescription(description);
        console.log({ description });
        setLoading(false);
      } else {
        // 新規コード作成時（/free-coding遷移時）、新規コードを作成して再度リダイレクトする（urlに統一性を持たせるため）
        const code = await createCode(
          "def select(field,my_pos,other_pos):\n  return 0",
          1,
          "1"
        );
        navigate(`/free-coding/${code.id}/`);
      }
      await setTimeout(() => {}, 5000);
      setLoading(false);
      console.log(loading);
    };
    loadCode();
  }, []);

  const { unityContext, unityStatus, startGame } = useUnityGame("SquarePaint");

  const [showUnity, setShowUnity] = useState(false); // unityの表示フラグ

  const editorRef = useRef(
    null
  ) as React.MutableRefObject<null | HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor; //ここにeditorの内容が返ってくる
  }
  function getInputCode(): string {
    if (editorRef.current == null) throw "editorRefが初期化されてません";
    // @ts-ignore
    return editorRef.current?.getValue();
  }

  // jsonに値が入ればunity描画、空が入ればunity非表示
  useEffect(() => {
    setShowUnity(json !== "");
    startGame(json);
  }, [json, startGame]);

  // unityモーダルを閉じる
  const _closeEditorButtonHandler = () => {
    setJson("");
    setShowError(false);
  };

  const execCode = async () => {
    const inputCode = getInputCode();
    if (isCode(code)) {
      setCode({ ...code, codeContent: inputCode });
      console.log({ code });
      await updateCode(code.id, inputCode, code.step, code.language);
      const { json } = await testCode(code.id);
      setJson(JSON.stringify(json));
      setTurnLog(json.turn);
    }
  };

  // ログの表示管理
  const [showLog, setShowLog] = useState(false);

  const toggleLogHandler = () => {
    setShowLog((showLog) => !showLog);
  };

  useEffect(() => {
    if (error) {
      setShowUnity(false);
      setShowLog(false);
      setShowError(true);
    }
  }, [error]);

  useEffect(() => {
    if (errorCodeAPI) {
      setError(error + "," + errorCodeAPI);
    } else {
      setError(error || errorCodeAPI);
    }
  }, [errorCodeAPI]);
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
    code,
    description,
    error,
    loading,
    isCode,
    execCode,
    turnLog,
    handleEditorDidMount,
    closeEditorButtonHandler: _closeEditorButtonHandler,
    showUnity,
    unityContext,
    toggleLogHandler,
    showLog,
    showError,
    unityLoad: unityStatus.isLoading,
  };
};
