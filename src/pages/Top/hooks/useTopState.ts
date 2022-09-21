import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  anonymousLoginBtnDisabled: boolean;
  anonymousLoginBtnHandler: () => void;
};

export type IResponse2 = {
  anonymousLoginBtnDisabled2: boolean;
  anonymousLoginBtnHandler2: () => void;
};

export const useTopState = (): IResponse => {
  const [anonymousLoginBtnDisabled, setAnonymousLoginBtnDisabled] =
    useState(false);
  const navigate = useNavigate();

  const _anonymousLoginBtnHandler = () => {
    setAnonymousLoginBtnDisabled(true);
    signInAnonymously(getAuth())
      .then(() => {
        navigate("/event/set-name");
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

export const useLoginTopState = (): IResponse2 => {
  const [anonymousLoginBtnDisabled, setAnonymousLoginBtnDisabled] =
    useState(false);
  const navigate = useNavigate();

  const _anonymousLoginBtnHandler = () => {
    setAnonymousLoginBtnDisabled(true);
    signInAnonymously(getAuth())
      .then(() => {
        navigate("/start");
      })
      .catch(() => {
        setAnonymousLoginBtnDisabled(false);
      });
  };

  return {
    anonymousLoginBtnDisabled2: anonymousLoginBtnDisabled,
    anonymousLoginBtnHandler2: _anonymousLoginBtnHandler,
  };
};