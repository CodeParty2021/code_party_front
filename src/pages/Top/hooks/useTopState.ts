import { getAuth, signInAnonymously } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";

export type IResponse = {
  FirstLoginBtnDisabled: boolean;
  FirstLoginBtnHandler: () => void;
  NormalLoginBtnDisabled: boolean;
  NormalLoginBtnHandler: () => void;
  CreateUserBtnDisabled: boolean;
  CreateUserBtnHandler: () => void;
};

export const useTopState = (): IResponse => {
  const [FirstLoginBtnDisabled, setFirstLoginBtnDisabled] = useState(false);
  const [NormalLoginBtnDisabled, setNormalLoginBtnDisabled] = useState(false);
  const [CreateUserBtnDisabled, setCreateUserBtnDisabled] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.user);
  // ログイン処理が終わるまで遷移を待つ
  const [waitTransition, setWaitTransition] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (waitTransition && isLogin) {
      navigate("/set-name");
    }
  }, [waitTransition, isLogin]);

  const _FirtstLoginBtnHandler = () => {
    setFirstLoginBtnDisabled(true);
    signInAnonymously(getAuth())
      .then(() => {
        setWaitTransition(true);
      })
      .catch(() => {
        setFirstLoginBtnDisabled(false);
      });
  };

  const _NormalLoginBtnHandler = () => {
    setNormalLoginBtnDisabled(true);
    navigate("/start");
  };

  const _CreateUserBtnHandler = () => {
    setCreateUserBtnDisabled(true);
    navigate("/start-email-first-time");
  };

  return {
    FirstLoginBtnDisabled: FirstLoginBtnDisabled,
    FirstLoginBtnHandler: _FirtstLoginBtnHandler,
    NormalLoginBtnDisabled: NormalLoginBtnDisabled,
    NormalLoginBtnHandler: _NormalLoginBtnHandler,
    CreateUserBtnDisabled: CreateUserBtnDisabled,
    CreateUserBtnHandler: _CreateUserBtnHandler,
  };
};
