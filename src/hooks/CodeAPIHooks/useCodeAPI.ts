import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  getCode: (codeId: string) => Promise<GetCodeResponseType>;
  updateCode: (
    id: string,
    codeContent: string,
    step: string,
    language: string
  ) => Promise<UpdateCodeResponseType>;
  createCode: (
    codeContent: string,
    step: string,
    language: string
  ) => Promise<CreateCodeResponseType>;
  testCode: (codeId: string) => Promise<TestCodeResponseType>;
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

export type GetCodeResponseType = CodeType;

export type UpdateCodeResponseType = {
  codeContent: string;
  step: string;
  language: string;
};

export type CreateCodeResponseType = CodeType;

export type TestCodeResponseType = {
  unityURL: string;
  jsonId: string;
  json: JSONLog;
};
export type JSONLog = {
  turn: TurnState[];
};
export type TurnState = {
  players: PlayerState[];
};
export type PlayerState = {
  print: string;
};

export const useCodeAPI = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  /**
   * codeIdからコードを取得する
   * @param codeId コードID
   */
  const getCode = (codeId: string): Promise<GetCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get("/codes/" + codeId + "/", {})
        .then((response: AxiosResponse<GetCodeResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return rejects(new Error(`updateCodeError${error}`));
        });
    });
  };

  /**
   * codeIdのコードをUpdateする
   * @param codeId コードID
   * @param content コードの中身
   * @param step ステップID
   * @param language 言語ID
   */
  const updateCode = async (
    codeId: string,
    codeContent: string,
    step: string,
    language: string
  ): Promise<UpdateCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .put(`/codes/${codeId}/`, {
          codeContent,
          step,
          language,
        })
        .then((response: AxiosResponse<UpdateCodeResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((err: AxiosError) => {
          setLoading(false);
          setError(`updateCodeError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  /**
   * 新規codeを作成する
   * @param content コードの中身
   * @param step ステップID
   * @param language 言語ID
   */
  const createCode = async (
    codeContent: string,
    step: string,
    language: string
  ): Promise<CreateCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .post(`/codes`, {
          codeContent,
          step,
          language,
        })
        .then((response: AxiosResponse<CreateCodeResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((err: AxiosError) => {
          setLoading(false);
          setError(`createCodeError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  /**
   * コードを実行する。対戦相手はランダムで選ばれる
   * @param codeId コードID
   */
  const testCode = async (codeId: string): Promise<TestCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get(`/codes/${codeId}/test`)
        .then((response: AxiosResponse<TestCodeResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(`testCodeAPIError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  return {
    loading,
    error,
    getCode,
    updateCode,
    createCode,
    testCode,
  };
};
