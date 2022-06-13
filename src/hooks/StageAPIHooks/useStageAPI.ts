import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  getStage: (stageId: number) => Promise<GetStageResponseType>;
};

export interface StageType {
  id: number;
  index: number;
  objective: string;
  movie_url: string;
  world: number; // worldId
}

export interface Option {
  num_players?: number;
  initial_pos?: Array<number[]>;
}

export type GetStageResponseType = StageType;

export const useStageAPI = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  /**
   * stageIdからコードを取得する
   * @param {number} stageId ステージId
   */
  const getStage = (stageId: number): Promise<GetStageResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get("/stages/" + stageId + "/", {})
        .then((response: AxiosResponse<GetStageResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return reject(new Error(`GetStageResponseError ${error}`));
        });
    });
  };
  return {
    loading,
    error,
    getStage,
  };
};
