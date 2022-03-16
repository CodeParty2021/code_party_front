import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IState = {
  data?: ResultType;
  error?: AxiosError;
  loading: boolean;
};

export type IResponse = IState & {
  fetchResult: (resultId: string) => Promise<void>;
};

export type ResultType = {
  id: string;
  jsonPath: string;
  step: number;
  codes: string[];
};

export const useFetchResult = (): IResponse => {
  const [res, setRes] = useState<IState>({
    loading: false,
  });

  const _fetchResult = async (resultId: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    await axiosWithIdToken
      .get(`/results/${resultId}/`)
      .then((response: AxiosResponse<ResultType>) => {
        setRes({ data: response.data, loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ error, loading: false });
      });
  };

  return {
    ...res,
    fetchResult: _fetchResult,
  };
};
