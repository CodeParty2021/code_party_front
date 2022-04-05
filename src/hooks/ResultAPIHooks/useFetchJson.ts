import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IState = {
  data?: string;
  error?: AxiosError;
  loading: boolean;
};

export type IResponse = IState & {
  fetchJson: (resultId: string) => Promise<void>;
};

export interface SquarePaintJson {
  players: Player[];
  stage: Stage;
  turn: Turn[];
  result: Result;
}

export interface Player {
  icon: string;
  name: string;
}

export interface Result {
  scores: number[];
  rank: number[];
}

export interface Stage {
  width: number;
  height: number;
  field: number[];
  players: StagePlayer[];
}

export interface StagePlayer {
  x: number;
  y: number;
  score: number;
}

export interface Turn {
  field: number[];
  players: TurnPlayer[];
}

export interface TurnPlayer {
  x: number;
  y: number;
  state: number;
  action: number;
  score: number;
  print: string;
}

export const useFetchJson = (): IResponse => {
  const [res, setRes] = useState<IState>({
    loading: false,
  });

  const _fetchJson = async (resultId: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    await axiosWithIdToken
      .get(`/results/${resultId}/json`)
      .then((response: AxiosResponse<SquarePaintJson>) => {
        console.log("fawewf");
        console.log("result", response);
        setRes({ data: JSON.stringify(response.data), loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ error, loading: false });
      });
  };

  return {
    ...res,
    fetchJson: _fetchJson,
  };
};
