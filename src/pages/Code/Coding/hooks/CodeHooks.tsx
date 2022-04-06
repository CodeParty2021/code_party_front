import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UnityContext } from "react-unity-webgl";
import { uri } from "config";
import { useNavigate, useParams } from "react-router-dom";

export type APIState = {
  data: CodeType | null;
  error: AxiosError | null;
  loading: boolean;
};

export type CodeType = {
  id: string;
  codeContent: string;
  language: string;
  updatedAt: string;
  createdAt: string;
  user: string;
  step: string;
};

export type RunResponse = {
  unityURL: string;
  jsonId: string;
};

type JSONLog = {
  turn: TurnState[];
};
type TurnState = {
  players: PlayerState[];
};
type PlayerState = {
  print: string;
};

export type IResponse = APIState & {
  put: (content: string, step: string, language: string) => void;
  turnLog: TurnState[];
  handleEditorDidMount: (editor: any, _monaco: any) => void;
  getCode: () => string;
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
  const { codeId } = useParams(); //code_id
  const { user } = useSelector((state: RootState) => state.user);

  const [res, setRes] = useState<APIState>({
    data: null,
    error: null,
    loading: false,
  });
  const [json, setJson] = useState<string>("");
  const [turnLog, setTurnLog] = useState<TurnState[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (codeId) get();
    else post();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_progression, setProgression] = useState(0);
  useEffect(() => {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  const [showUnity, setShowUnity] = useState(false);
  console.log(turnLog);
  const editorRef = useRef(
    null
  ) as React.MutableRefObject<null | HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor; //ここにeditorの内容が返ってくる
  }
  function getCode(): string {
    if (editorRef.current == null) throw "editorRefが初期化されてません";
    // @ts-ignore
    return editorRef.current?.getValue();
  }
  const loadJson = (json: string) => {
    //unityContext.send("JSONLoader", "LoadJSON", json);
    unityContext.send("JSUnityConnector", "SetSimulationData", json);
    unityContext.send("JSUnityConnector", "LoadStage", "SquarePaint");
  };

  useEffect(() => {
    setShowUnity(json !== ""); //jsonがセットされている場合はUnityを表示する
    loadJson(json);
  }, [json]);

  const get = () => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axios
      .get(`${uri}/codes/` + codeId, {})
      .then((response: AxiosResponse<CodeType>) => {
        setRes({ data: response.data, error: null, loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ data: null, error, loading: false });
      });
  };
  const put = (content: string, step: string, language: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axios
      .put(
        `${uri}/codes/${codeId}/`,
        {
          code_content: content,
          step,
          language,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.jwt,
          },
        }
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        //レスポンスがあったらrunする
        axios
          .get(`${uri}/codes/${codeId}/test`, {})
          .then((response: AxiosResponse<RunResponse>) => {
            console.log(response);
            axios
              .get(`${uri}/results/${response.data.jsonId}/json/`, {})
              .then((response: AxiosResponse<JSONLog>) => {
                console.log(response);
                setJson(JSON.stringify(response.data));
                setTurnLog(response.data.turn);
              })
              .catch((error: AxiosError) => {
                console.log(error);
              });
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  //新規コード作成のときのpost
  const post = () => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axios
      .post(
        `${uri}/codes/`,
        {
          code_content: "def select(field,my_pos,other_pos):\n  return 0",
          step: 1,
          language: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.jwt,
          },
        }
      )
      .then((response: AxiosResponse<CodeType>) => {
        setRes({ data: response.data, error: null, loading: false });
        navigate(`/free-coding/${response.data.id}/`);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return {
    res,
    put,
    turnLog,
    handleEditorDidMount,
    getCode,
    setShowUnity,
    showUnity,
    unityContext,
  };
};
