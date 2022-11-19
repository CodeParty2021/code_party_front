import {
  AccountServiceType,
  useFirebaseAuth,
} from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutAsync } from "services/user/user";

export type IResponse = {
  loading: boolean;
  algoMessage: string;
  signInButtonsHandler: (accountService: AccountServiceType) => void;
  backLinkButtonHandler: () => void;
};

export const useStartState = (): IResponse => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { signInOfFirebase } = useFirebaseAuth();
  const [algoMessage, setAlgoMessage] = useState("ログイン方法を選んでね");

  useEffect(() => {
    dispatch(signOutAsync());
    setLoading(false);
  }, []);

  const signInButtonsHandler = (accountService: AccountServiceType): void => {
    setLoading(true);
    signInOfFirebase({
      accountService,
      signInSuccessUrl: "/select-mode",
    }).catch(() => {
      setLoading(false);
      setAlgoMessage("ログインに失敗しました。");
    });
  };

  const backLinkButtonHandler = (): void => {
    navigate("/", { replace: true });
  };

  return {
    loading,
    algoMessage,
    signInButtonsHandler,
    backLinkButtonHandler,
  };
};
