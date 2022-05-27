import { useUserAPI } from "hooks/UserAPIHooks/userAPIHooks";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDisplayName } from "services/user/user";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  nameInputRef: RefObject<HTMLInputElement>;
  startBtnHandler: () => void;
  nameInputHandler: () => void;
  btnDisabled: boolean;
};

export const useSetNameState = (): IResponse => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { error, loading, updateDisplayName } = useUserAPI();
  const [errorDisplay, setErrorDisplay] = useState<string | undefined>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  useEffect(() => {
    setErrorDisplay(error);
  }, [error]);
  const _changeNameHandler = () => {
    if (nameInputRef.current?.value) {
      updateDisplayName(nameInputRef.current.value).then((response) => {
        dispatch(updateUserDisplayName(response.displayName));
        navigate("/event/select-mode");
      });
    } else {
      setErrorDisplay("値を入力してください");
    }
  };
  const nameInputHandler = () => {
    if (nameInputRef.current?.value === "") {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };
  return {
    loading,
    error: errorDisplay,
    nameInputRef,
    startBtnHandler: _changeNameHandler,
    nameInputHandler,
    btnDisabled,
  };
};
