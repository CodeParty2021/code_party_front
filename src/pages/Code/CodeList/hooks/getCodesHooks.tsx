import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { uri } from "config";

interface IResponse {
  data: Code[] | null;
  error: AxiosError | null;
  loading: boolean;
}

type Code = {
  id: string;
  codeContent: string;
  language: string;
  updatedAt: string;
  createdAt: string;
  user: string;
  step: string;
};

export const useFetchCodes = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [res, setRes] = useState<IResponse>({
    data: null,
    error: null,
    loading: false,
  });
  useEffect(() => {
    if (user) {
      fetchRequest(user.id);
    }
  }, []);

  const fetchRequest = (userID: string) => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    axios
      .get(`${uri}/codes`, {
        params: {
          user: userID,
        },
      })
      .then((response: AxiosResponse<Code[]>) => {
        setRes({ data: response.data, error: null, loading: false });
      })
      .catch((error: AxiosError) => {
        setRes({ data: null, error, loading: false });
      });
  };

  return res;
};
