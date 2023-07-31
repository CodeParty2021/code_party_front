import { getAuth } from "firebase/auth";
import { useFirebaseAuth } from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import {
  KeyboardEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAsync } from "services/user/user";
import { RootState } from "store";

export type IResponse = {
  loading: boolean;
  algoMessage: string;
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
  emailChangeHandler: () => void;
  passwordChangeHandler: () => void;
  startBtnHandler: () => void;
  btnDisabled: boolean;
  backLinkButtonHandler: () => void;
  enterSubmitHandler: KeyboardEventHandler<HTMLInputElement>;
};

export const useStartState = (): IResponse => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [algoMessage, setAlgoMessage] =
    useState("メールアドレスとパスワードをいれてね");

  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const auth = getAuth();

  const { signInWithEmail } = useFirebaseAuth();

  useEffect(() => {
    dispatch(signOutAsync());
    setLoading(false);
  }, []);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [emailInputRef.current]);

  const _updateBtnDisabledState = () => {
    if (
      emailInputRef.current?.value === "" ||
      passwordInputRef.current?.value === ""
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };

  const backLinkButtonHandler = (): void => {
    navigate("/", { replace: true });
  };

  const startBtnHandler = async () => {
    setLoading(true);
    const email = emailInputRef.current?.value as string;
    const password = passwordInputRef.current?.value as string;

    await signInWithEmail({
      email,
      password,
    }).catch(() => {
      setAlgoMessage("メールアドレスかパスワードが違います");
      setLoading(false);
    });
    setLoading(false);
  };

  const enterSubmitHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    // enterで送信
    if (!e.nativeEvent.isComposing && e.key === "Enter") {
      startBtnHandler();
    }
  };

  if (isLogin && auth.currentUser && !auth.currentUser?.isAnonymous) {
    navigate("/select-mode", { replace: true });
  }

  return {
    loading,
    algoMessage,
    emailRef: emailInputRef,
    passwordRef: passwordInputRef,
    emailChangeHandler: _updateBtnDisabledState,
    passwordChangeHandler: _updateBtnDisabledState,
    startBtnHandler,
    backLinkButtonHandler,
    btnDisabled,
    enterSubmitHandler,
  };
};
