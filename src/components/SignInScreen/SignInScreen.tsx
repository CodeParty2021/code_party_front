import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

import "firebase_config";
import { signInAsync } from "services/user/user";
import { RootState } from "store";

type Props = {
  signInSuccessUrl?: string;
};

export const SignInScreen: React.FC<Props> = (props: Props) => {
  // firebase ui のコンフィグ
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: props.signInSuccessUrl
      ? "/#" + props.signInSuccessUrl
      : "/#", // 成功後の遷移先
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const unRegisterObserver = useSelector(
    (state: RootState) => state.user.unRegisterObserver
  );

  const navigate = useNavigate(); //router

  if (isLogin) {
    navigate(props.signInSuccessUrl ? props.signInSuccessUrl : "/");
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

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};
