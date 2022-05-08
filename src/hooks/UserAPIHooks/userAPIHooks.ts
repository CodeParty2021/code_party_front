import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { axiosWithIdToken } from "axios_config";
export type IResponse = {
  loading: boolean;
  error: string | undefined;
  updateDisplayName: (displayName: string) => Promise<UpdateUserResponseType>;
};

export type UpdateUserResponseType = {
  displayName: string;
  picture: string;
  isStaff: boolean;
};

export const useUserAPI = (): IResponse => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  /**
   * 自分の表示名をupdateする
   * @param displayName 表示名
   */
  const updateDisplayName = (
    displayName: string | undefined
  ): Promise<UpdateUserResponseType> => {
    return new Promise((resolve, rejects) => {
      setError(undefined);
      setLoading(true);
      axiosWithIdToken
        .put("/users/update/", { displayName })
        .then((response: AxiosResponse<UpdateUserResponseType>) => {
          setLoading(false);
          return resolve(response.data);
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return rejects(new Error(`updateCodeError${error}`));
        });
    });
  };

  return {
    loading,
    error,
    updateDisplayName,
  };
};
