import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
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

export type GetStageResponseType = StageType;

export const useStageAPI = (): IResponse => {
  const [error, setError] = useState<string | undefined>();

  /**
   * stageIdからコードを取得する
   * @param {number} stageId ステージId
   */
  const getStage = (stageId: number): Promise<GetStageResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      axiosWithIdToken
        .get("/stages/" + stageId + "/", {})
        .then((response: AxiosResponse<GetStageResponseType>) => {
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setError(`GetStageResponseError ${error}`);
          return reject(new Error(`GetStageResponseError ${error}`));
        });
    });
  };
  return {
    error,
    getStage,
  };
};
