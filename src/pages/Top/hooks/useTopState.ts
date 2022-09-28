import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export type IResponse = {
  FirstLoginBtnDisabled: boolean;
  FirstLoginBtnHandler: () => void;
};

export type IResponse2 = {
  NormalLoginBtnDisabled: boolean;
  NormalLoginBtnHandler: () => void;
};

export const useFisrtLoginTopState = (): IResponse => {
  const [FirstLoginBtnDisabled, setFirstLoginBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const _FirtstLoginBtnHandler = () => {
    setFirstLoginBtnDisabled(true);
    signInAnonymously(getAuth()) //認証部分
      .then(() => {
        navigate("/event/set-name");
      })
      .catch(() => {
        setFirstLoginBtnDisabled(false);
      });
  };

  return {
    FirstLoginBtnDisabled: FirstLoginBtnDisabled,
    FirstLoginBtnHandler: _FirtstLoginBtnHandler,
  };
};

export const useNormalLoginTopState = (): IResponse2 => {
  const [NormalLoginBtnDisabled, setNormalLoginBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const _NormalLoginBtnHandler = () => {
    setNormalLoginBtnDisabled(true);
    navigate("/start");
  };

  return {
    NormalLoginBtnDisabled: NormalLoginBtnDisabled,
    NormalLoginBtnHandler: _NormalLoginBtnHandler,
  };
};
