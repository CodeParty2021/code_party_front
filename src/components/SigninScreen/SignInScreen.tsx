import React, { useEffect, useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "config";
import { signInAsync } from "services/user/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router";
import "firebase/compat/auth"; //これ消すとバグる謎

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

type Props = {};
type ErrorType = {
  flg: boolean;
  message: string | null;
};

export const SignInScreen: React.FC<Props> = () => {
  const [error, setError] = useState<ErrorType>({ flg: false, message: null });
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const unRegisterObserver = useSelector(
    (state: RootState) => state.user.unRegisterObserver
  );

  const navigate = useNavigate();
  if (isLogin) {
    navigate("/");
  }

  useEffect(() => {
    dispatch(signInAsync());
  }, [dispatch]);

  //observer周りの処理
  useEffect(() => {
    if (unRegisterObserver) {
      return () => unRegisterObserver();
    } else {
      setError({ flg: true, message: "認証に失敗しました" });
    }
  }, [unRegisterObserver]);

  return (
    <div>
      <h1>My App</h1>
      <h3>{error && error.message}</h3>
      <p>Please sign-in:</p>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
