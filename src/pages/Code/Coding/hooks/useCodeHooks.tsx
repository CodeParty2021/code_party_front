import React, { useEffect, useRef, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import { useNavigate, useParams } from "react-router-dom";
import { useCodeAPI, CodeType, TurnState } from "hooks/CodeAPIHooks/useCodeAPI";

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
  setShowUnity: React.Dispatch<React.SetStateAction<boolean>>;
  showUnity: boolean;
  unityContext: UnityContext;
};

//TODO:ここstepかstageごとに変更する必要あり
const unityContext = new UnityContext({
  loaderUrl: "unity/sp/web.loader.js",
  dataUrl: "unity/sp/web.data.unityweb",
  frameworkUrl: "unity/sp/web.framework.js.unityweb",
  codeUrl: "unity/sp/web.wasm.unityweb",
});

export const useCodingState = () => {
  const { codeId } = useParams<string>(); //code_id
  const { error, getCode, updateCode, createCode, testCode } = useCodeAPI(); //api通信用カスタムフック
  const [loading, setLoading] = useState<boolean>(false);
  const [json, setJson] = useState<string>("");
  const [turnLog, setTurnLog] = useState<TurnState[]>([]);
  const navigate = useNavigate();

  const [code, setCode] = useState<CodeType>(); //表示中のコード
  //code の型ガード
  function isCode(code: CodeType | undefined): code is CodeType {
    return code?.id !== undefined;
  }

  //codeの更新
  useEffect(() => {
    const loadCode = async () => {
      setLoading(true);
      if (codeId) {
        const code = await getCode(codeId as string); //TODO エラー処理
        setCode(code);
      } else {
        // 新規コード作成時（/free-coding遷移時）、新規コードを作成して再度リダイレクトする（urlに統一性を持たせるため）
        const code = await createCode(
          "def select(field,my_pos,other_pos):\n  return 0",
          "1",
          "1"
        );
        navigate(`/free-coding/${code.id}/`);
      }
      await setTimeout(() => {}, 5000);
      setLoading(false);
    };
    loadCode();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_progression, setProgression] = useState(0); // this value will change to 1 when the end of the loading.
  useEffect(() => {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  const [showUnity, setShowUnity] = useState(false);
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
  const loadJson = (json: string) => {
    //unityContext.send("JSONLoader", "LoadJSON", json);
    unityContext.send("ReactUnityConnector", "SetSimulationData", json);
    unityContext.send("ReactUnityConnector", "LoadStage", "SquarePaint");
  };

  useEffect(() => {
    setShowUnity(json !== ""); //jsonがセットされている場合はUnityを表示する
    loadJson(json);
  }, [json]);

  const execCode = async () => {
    const inputCode = getInputCode();
    console.log("inputCode:", inputCode);
    console.log("setCode:", { ...code, codeContent: inputCode });
    if (isCode(code)) {
      setCode({ ...code, codeContent: inputCode });
      console.log("code:", code);
      await updateCode(code.id, inputCode, code.step, code.language);
      const { json } = await testCode(code.id);
      setJson(JSON.stringify(json));
      setTurnLog(json.turn);
    }
  };

  return {
    code,
    error,
    loading,
    isCode,
    execCode,
    turnLog,
    handleEditorDidMount,
    setShowUnity,
    showUnity,
    unityContext,
  };
};
