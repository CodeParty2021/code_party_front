import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { axiosWithIdToken } from "axios_config";

export type IState = {
  data?: CodeType[];
  error?: AxiosError;
  loading: boolean;
};

export type IResponse = IState & {
  update: (userId: string, stepID?: string) => void;
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

export const useFetchCodes = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const [res, setRes] = useState<IState>({
    loading: false,
  });
  useEffect(() => {
    if (user) {
      fetchRequest(user.id);
    }
  }, []);

  const fetchRequest = (userID: string, stepID?: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axiosWithIdToken
      .get("/codes", {
        params: {
          user: userID,
          step: stepID,
        },
      })
      .then((response: AxiosResponse<CodeType[]>) => {
        setRes({ data: response.data, loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ error, loading: false });
      });
  };

  return {
    ...res,
    update: fetchRequest,
  };
};
