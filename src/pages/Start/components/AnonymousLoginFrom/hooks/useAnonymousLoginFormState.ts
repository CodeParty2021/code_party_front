import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  anonymousLoginBtnDisabled: boolean;
  anonymousLoginBtnHandler: () => void;
};

export const useAnonymousLoginFormState = (): IResponse => {
  const [anonymousLoginBtnDisabled, setAnonymousLoginBtnDisabled] =
    useState(false);
  const navigate = useNavigate();

  const _anonymousLoginBtnHandler = () => {
    setAnonymousLoginBtnDisabled(true);
    signInAnonymously(getAuth())
      .then(() => {
        navigate("/select-mode");
      })
      .catch(() => {
        setAnonymousLoginBtnDisabled(false);
      });
  };

  return {
    anonymousLoginBtnDisabled: anonymousLoginBtnDisabled,
    anonymousLoginBtnHandler: _anonymousLoginBtnHandler,
  };
};
