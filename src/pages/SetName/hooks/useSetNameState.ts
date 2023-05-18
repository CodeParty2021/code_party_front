import { useUserAPI } from "hooks/UserAPIHooks/userAPIHooks";
import {
  KeyboardEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDisplayName } from "services/user/user";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  nameInputRef: RefObject<HTMLInputElement>;
  startBtnHandler: () => void;
  nameInputChangeHandler: () => void;
  nameInputKeydownHandler: KeyboardEventHandler<HTMLInputElement>;
  blackLinkButtonHandler: () => void;
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
        navigate("/select-mode");
      });
    } else {
      setErrorDisplay("値を入力してください");
    }
  };
  const nameInputChangeHandler = () => {
    if (nameInputRef.current?.value === "") {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };
  const nameInputKeydownHandler: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    // enterで送信
    if (!e.nativeEvent.isComposing && e.key === "Enter") {
      _changeNameHandler();
    }
  };
  const blackLinkButtonHandler = () => {
    navigate("/");
  };
  return {
    loading,
    error: errorDisplay,
    nameInputRef,
    startBtnHandler: _changeNameHandler,
    nameInputChangeHandler,
    nameInputKeydownHandler,
    blackLinkButtonHandler,
    btnDisabled,
  };
};
