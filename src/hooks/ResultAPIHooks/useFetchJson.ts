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

export const useFetchJson = (): IResponse => {
  const [res, setRes] = useState<IState>({
    loading: false,
  });

  const _fetchJson = async (resultId: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    await axiosWithIdToken
      .get(`/results/${resultId}/json`)
      .then((response: AxiosResponse) => {
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
