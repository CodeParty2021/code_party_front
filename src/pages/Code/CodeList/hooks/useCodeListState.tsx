import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { isUser } from "services/user/user";
import { useNavigate } from "react-router-dom";
import { CodeType, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { BASIC_INIT_CODE } from "pages/Code/assets/InitCodes";

export type IResponse = {
  codes: CodeType[];
  error: AxiosError | undefined;
  loading: boolean;
  newCodeButtonHandler: () => void;
  deleteHandler: (id: string) => void;
};

const FREE_STEP_ID = 1;

export const useCodeListState = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { createCode, getCodesFilterUserId, deleteCode } = useCodeAPI();
  const [codes, setCodes] = useState<CodeType[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    if (user) {
      getCodesFilterUserId(user.id)
        .then((res) => {
          setCodes(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  const _newCodeButtonHandler = async () => {
    let codeId: string;
    if (isUser(user)) {
      const code = await createCode(BASIC_INIT_CODE, FREE_STEP_ID, "1");
      codeId = code.id;
      navigate(`/free-coding/${codeId}/codes`);
    }
  };

  const _deleteHandler = async (id: string) => {
    setLoading(true);
    await deleteCode(id).catch((error: AxiosError) => {
      setError(error);
    });
    setCodes(codes.filter((code) => code.id !== id));
    setLoading(false);
  };

  return {
    loading,
    error,
    codes,
    newCodeButtonHandler: _newCodeButtonHandler,
    deleteHandler: _deleteHandler,
  };
};
