import React, { useEffect } from "react";

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

type Props = {
  signInSuccessUrl?: string;
};

export const SignInScreen: React.FC<Props> = (props: Props) => {
  // firebase ui のコンフィグ
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: props.signInSuccessUrl ? props.signInSuccessUrl : "/", // 成功後の遷移先
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  console.log(uiConfig);
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const unRegisterObserver = useSelector(
    (state: RootState) => state.user.unRegisterObserver
  );

  const navigate = useNavigate(); //router

  if (isLogin) {
    navigate("/");
  }

  //サインインのAsync
  useEffect(() => {
    dispatch(signInAsync());
  }, [dispatch]);

  //observer周りの処理
  useEffect(() => {
    if (unRegisterObserver) {
      return () => unRegisterObserver();
    }
  }, [unRegisterObserver]);

  return (
    <div>
      <h1>Sign In</h1>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
