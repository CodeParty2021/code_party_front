import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  getCode: (codeId: string) => Promise<GetCodeResponseType>;
  getCodesFilterUserId: (userId: string) => Promise<GetCodesResponseType>;
  getCodesFilterStepIdAndUserId: (
    stepId: number,
    userId: string
  ) => Promise<GetCodesResponseType>;
  updateCode: (
    id: string,
    codeContent: string,
    stepId: number,
    language: string
  ) => Promise<UpdateCodeResponseType>;
  createCode: (
    codeContent: string,
    stepId: number,
    language: string
  ) => Promise<CreateCodeResponseType>;
  deleteCode: (id: string) => Promise<void>;
  testCode: (codeId: string) => Promise<TestCodeResponseType>;
};

export type CodeType = {
  id: string;
  codeContent: string;
  language: string;
  updatedAt: string;
  createdAt: string;
  user: string;
  step: number;
};

export const isCodeType = (instance: any): instance is CodeType => {
  return (
    instance !== undefined &&
    "id" in instance &&
    "codeContent" in instance &&
    "language" in instance &&
    "updatedAt" in instance &&
    "createdAt" in instance &&
    "user" in instance &&
    "step" in instance
  );
};

export type GetCodeResponseType = CodeType;

export const isGetCodeResponseType = isCodeType;

export type GetCodesResponseType = CodeType[];

export const isGetCodesResponseType = (
  instance: any
): instance is GetCodesResponseType => {
  return (
    Array.isArray(instance) && instance.every((value) => isCodeType(value))
  );
};

export type UpdateCodeResponseType = {
  codeContent: string;
  step: string;
  language: string;
};

export const isUpdateCodeResponseType = (
  instance: any
): instance is CodeType => {
  return (
    instance !== undefined &&
    "codeContent" in instance &&
    "language" in instance &&
    "step" in instance
  );
};

export type CreateCodeResponseType = CodeType;

export const isCreateCodeResponseType = isCodeType;

export type TestCodeResponseType = {
  unityURL: string;
  json: JSONLog;
};

export const isTestCodeResponseType = (
  instance: any
): instance is TestCodeResponseType => {
  return (
    instance !== undefined &&
    "unityURL" in instance &&
    "json" in instance &&
    isJSONLog(instance.json)
  );
};

export type JSONLog = {
  turn: TurnState[];
};

export const isJSONLog = (instance: any): instance is JSONLog => {
  return (
    instance !== undefined &&
    "turn" in instance &&
    Array.isArray(instance.turn) &&
    instance.turn.every((value: any) => isTurnState(value))
  );
};

export type TurnState = {
  players: PlayerState[];
};

export const isTurnState = (instance: any): instance is TurnState => {
  return (
    instance !== undefined &&
    "players" in instance &&
    Array.isArray(instance.players) &&
    instance.players.every((value: any) => isPlayerState(value))
  );
};

export type PlayerState = {
  print: string;
};

export const isPlayerState = (instance: any): instance is PlayerState => {
  return instance !== undefined && "print" in instance;
};

export const useCodeAPI = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  /**
   * codeIdからコードを取得する
   * @param {string} codeId コードID
   */
  const getCode = (codeId: string): Promise<GetCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get("/codes/" + codeId + "/", {})
        .then((response: AxiosResponse<GetCodeResponseType>) => {
          if (!isGetCodeResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of GetCodeResponseType"
            );
          }

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
   * ユーザIDを満たすコードを取得する. updated_atでソートする
   * @param {string} userId ユーザID
   */
  const getCodesFilterUserId = async (
    userId: string
  ): Promise<GetCodesResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get(`/codes`, {
          params: {
            user: userId,
            order_by: "updated_at",
          },
        })
        .then((response: AxiosResponse<GetCodesResponseType>) => {
          if (!isGetCodesResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of GetCodesResponseType"
            );
          }
          setLoading(false);
          return resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(`getCodesFilterUserIdAPIError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  /**
   * stepIDとユーザIDを満たすコードを取得する. updated_atでソートする
   * @param {number} stepId コードID
   * @param {string} userId ユーザID
   */
  const getCodesFilterStepIdAndUserId = async (
    stepId: number,
    userId: string
  ): Promise<GetCodesResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get(`/codes`, {
          params: {
            step: stepId,
            user: userId,
            order_by: "updated_at",
          },
        })
        .then((response: AxiosResponse<GetCodesResponseType>) => {
          if (!isGetCodesResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of GetCodesResponseType"
            );
          }

          setLoading(false);
          return resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(`getCodesFilterStepIdAndUserIdCodeAPIError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  /**
   * codeIdのコードをUpdateする
   * @param {string} codeId コードID
   * @param {string} content コードの中身
   * @param {string} stepId ステップID
   * @param {string} language 言語ID
   */
  const updateCode = async (
    codeId: string,
    codeContent: string,
    stepId: number,
    language: string
  ): Promise<UpdateCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .put(`/codes/${codeId}/`, {
          codeContent,
          step: stepId,
          language,
        })
        .then((response: AxiosResponse<UpdateCodeResponseType>) => {
          if (!isUpdateCodeResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of UpdateCodeResponseType"
            );
          }

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
   * @param stepId ステップID
   * @param language 言語ID
   */
  const createCode = async (
    codeContent: string,
    stepId: number,
    language: string
  ): Promise<CreateCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .post(`/codes/`, {
          codeContent,
          step: stepId,
          language,
        })
        .then((response: AxiosResponse<CreateCodeResponseType>) => {
          if (!isCreateCodeResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of CreateCodeResponseType"
            );
          }

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
   * コードを削除する
   * @param {string} codeId コードID
   */
  const deleteCode = async (codeId: string): Promise<void> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .delete(`/codes/${codeId}`)
        .then((response: AxiosResponse<void>) => {
          if (!isTestCodeResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of DeleteCodeResponseType"
            );
          }
          setLoading(false);
          return resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(`deleteCodeAPIError${err}`);
          return rejects(new Error(error));
        });
    });
  };

  /**
   * コードを実行する。対戦相手はランダムで選ばれる
   * @param {string} codeId コードID
   */
  const testCode = async (codeId: string): Promise<TestCodeResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .get(`/codes/${codeId}/test`)
        .then((response: AxiosResponse<TestCodeResponseType>) => {
          if (!isTestCodeResponseType(response.data)) {
            throw new Error(
              "Response data is not instance of TestCodeResponseType"
            );
          }

          setLoading(false);
          return resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          const errorResponse = String(err.response.data);
          const end = errorResponse.indexOf("Request"); //上手く検索できなかった
          const displayText =
            end != -1 ? errorResponse.substr(0, end) : errorResponse;
          setError(displayText);
          return rejects(new Error(error));
        });
    });
  };

  return {
    loading,
    error,
    getCode,
    getCodesFilterUserId,
    getCodesFilterStepIdAndUserId,
    updateCode,
    createCode,
    deleteCode,
    testCode,
  };
};
