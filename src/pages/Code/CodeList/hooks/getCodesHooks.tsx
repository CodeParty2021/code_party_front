import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { uri } from "config";
import { isUser } from "services/user/user";
import { useNavigate } from "react-router-dom";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";

export type IResponse = {
  codes: CodeType[];
  error: AxiosError | undefined;
  loading: boolean;
  newCodeButtonHandler: () => void;
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

const FREE_INIT_CODE = `
def select(field, my_pos, other_pos):
   return 0
`;

const FREE_STEP_ID = "1";

export const useFetchCodes = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { createCode } = useCodeAPI();
  const [codes, setCodes] = useState<CodeType[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      fetchRequest(user.id);
    }
  }, []);

  const fetchRequest = (userID: string) => {
    setLoading(true);
    // TODO: hooksを使うように書き換える
    axios
      .get(`${uri}/codes`, {
        params: {
          user: userID,
          step: FREE_STEP_ID,
        },
      })
      .then((response: AxiosResponse<CodeType[]>) => {
        setCodes(response.data);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
    setLoading(false);
  };

  const _newCodeButtonHandler = async () => {
    let codeId: string;
    if (isUser(user)) {
      const code = await createCode(FREE_INIT_CODE, FREE_STEP_ID, "1");
      codeId = code.id;
      navigate(`/free-coding/${codeId}/`);
    }
  };

  return {
    loading,
    error,
    codes,
    newCodeButtonHandler: _newCodeButtonHandler,
  };
};
