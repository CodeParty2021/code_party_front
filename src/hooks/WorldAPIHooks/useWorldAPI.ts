import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  error: string | undefined;
  getWorld: (worldId: number) => Promise<GetWorldResponseType>;
};

export interface WorldType {
  id: number;
  name: string;
  description: string;
  movie_url: string;
}

export type GetWorldResponseType = WorldType;

export const useWorldAPI = (): IResponse => {
  const [error, setError] = useState<string | undefined>();

  /**
   * worldIdからコードを取得する
   * @param {number} worldId ワールドID
   */
  const getWorld = (worldId: number): Promise<GetWorldResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      axiosWithIdToken
        .get("/worlds/" + worldId + "/", {})
        .then((response: AxiosResponse<GetWorldResponseType>) => {
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setError(`GetWorldResponseError ${error}`);
          return reject(new Error(`GetWorldResponseError ${error}`));
        });
    });
  };
  return {
    error,
    getWorld,
  };
};
