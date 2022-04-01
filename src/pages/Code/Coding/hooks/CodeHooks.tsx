import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { uri } from "config";
import { useNavigate } from "react-router-dom";

export type IResponse = {
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

export const useCode = (id: string | undefined) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [res, setRes] = useState<IResponse>({
    data: null,
    error: null,
    loading: false,
  });
  const [json, setJson] = useState<string>("");
  const [turnLog, setTurnLog] = useState<TurnState[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) get();
    else post();
  }, []);

  const get = () => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axios
      .get(`${uri}/codes/` + id, {})
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
        `${uri}/codes/${id}/`,
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
          .get(`${uri}/codes/${id}/test`, {})
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

  return { res, put, json, turnLog };
};
