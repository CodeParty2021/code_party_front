import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { isUser } from "services/user/user";
import { useNavigate } from "react-router-dom";
import { CodeType, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { EVENT1ON1_INIT_CODE } from "pages/Code/assets/InitCodes";

export type IResponse = {
  codes: CodeType[];
  error: AxiosError | undefined;
  loading: boolean;
  newCodeButtonHandler: () => void;
  deleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
  backHandler: () => void;
};

const FREE_STEP_ID = 2;

export const useCodeListState = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { createCode, getCodesFilterUserId, deleteCode } = useCodeAPI();
  const [codes, setCodes] = useState<CodeType[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const sortedCodes = useMemo(() => {
    return codes.sort((a, b) => {
      const aKey = new Date(a.updatedAt).getTime();
      const bKey = new Date(b.updatedAt).getTime();
      return bKey - aKey;
    });
  }, [codes]);

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
      const code = await createCode(EVENT1ON1_INIT_CODE, FREE_STEP_ID, "1");
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

  const backHandler = () => {
    navigate("/select-mode");
  };

  const editHandler = (id: string) => {
    navigate("/free-coding/" + id + "/codes");
  };

  return {
    loading,
    error,
    codes: sortedCodes,
    newCodeButtonHandler: _newCodeButtonHandler,
    deleteHandler: _deleteHandler,
    backHandler: backHandler,
    editHandler: editHandler,
  };
};
