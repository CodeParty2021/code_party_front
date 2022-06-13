import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  getStep: (stepId: number) => Promise<GetStepResponseType>;
};

export interface StepType {
  id: number;
  objective: string;
  description: string;
  index: number;
  stage: number;
  option: Option;
  opponents: number[];
}

export interface Option {
  num_players?: number;
  initial_pos?: Array<number[]>;
}

export type GetStepResponseType = StepType;

export const useStepAPI = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  /**
   * stepIdからコードを取得する
   * @param {number} stepId ステップId
   */
  const getStep = (stepId: number): Promise<GetStepResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get("/steps/" + stepId + "/", {})
        .then((response: AxiosResponse<GetStepResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return reject(new Error(`GetStepResponseError ${error}`));
        });
    });
  };
  return {
    loading,
    error,
    getStep,
  };
};
