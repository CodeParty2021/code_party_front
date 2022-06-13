import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  getWorld: (worldId: number) => Promise<GetWorldResponseType>;
};

export interface WorldType {
  id: number;
  name: string;
  description: string;
  wovie_url: string;
}

export interface Option {
  num_players?: number;
  initial_pos?: Array<number[]>;
}

export type GetWorldResponseType = WorldType;

export const useWorldAPI = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  /**
   * worldIdからコードを取得する
   * @param {number} worldId ワールドID
   */
  const getWorld = (worldId: number): Promise<GetWorldResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get("/worlds/" + worldId + "/", {})
        .then((response: AxiosResponse<GetWorldResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return reject(new Error(`GetWorldResponseError ${error}`));
        });
    });
  };
  return {
    loading,
    error,
    getWorld,
  };
};
