import { AxiosError, AxiosResponse } from "axios";
import { axiosWithIdToken } from "axios_config";
import { useState } from "react";

export type IState = {
  data?: SimulationResult;
  error?: any;
  loading: boolean;
};

export type IResponse = IState & {
  runCodes: (...codeIds: string[]) => void;
};

export type SimulationResult = {
  unityUrl: string;
  jsonId: string;
};

export const useRunCodes = (): IResponse => {
  const [res, setRes] = useState<IState>({
    loading: false,
  });

  const _runCodes = (...codeIds: string[]) => {
    if (codeIds.length == 0) return;

    setRes((prevState) => ({ ...prevState, loading: true }));

    const params: { [key: string]: any } = {};
    for (let i = 1; i < codeIds.length; i++) {
      params[`p${i}`] = codeIds[i];
    }

    axiosWithIdToken
      .get(`/codes/${codeIds[0]}/run/`, {
        params: params,
      })
      .then((response: AxiosResponse<any>) => {
        setRes({ data: response.data, loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ error: error, loading: false });
      });
  };

  return {
    ...res,
    runCodes: _runCodes,
  };
};
