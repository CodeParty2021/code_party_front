import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export type IResponse = {
  FirstLoginBtnDisabled: boolean;
  FirstLoginBtnHandler: () => void;
  NormalLoginBtnDisabled: boolean;
  NormalLoginBtnHandler: () => void;
};

export const useTopState = (): IResponse => {
  const [FirstLoginBtnDisabled, setFirstLoginBtnDisabled] = useState(false);
  const [NormalLoginBtnDisabled, setNormalLoginBtnDisabled] = useState(false);
  const navigate = useNavigate();

  const _FirtstLoginBtnHandler = () => {
    setFirstLoginBtnDisabled(true);
    signInAnonymously(getAuth())
      .then(() => {
        navigate("/set-name");
      })
      .catch(() => {
        setFirstLoginBtnDisabled(false);
      });
  };
  const _NormalLoginBtnHandler = () => {
    setNormalLoginBtnDisabled(true);
    navigate("/start");
  };
  return {
    FirstLoginBtnDisabled: FirstLoginBtnDisabled,
    FirstLoginBtnHandler: _FirtstLoginBtnHandler,
    NormalLoginBtnDisabled: NormalLoginBtnDisabled,
    NormalLoginBtnHandler: _NormalLoginBtnHandler,
  };
};
