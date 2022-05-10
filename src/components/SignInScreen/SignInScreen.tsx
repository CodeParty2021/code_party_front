import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { getAuth, signInWithCredential } from "firebase/auth";

import "firebase_config";
import { RootState } from "store";

type Props = {
  signInSuccessUrl?: string;
};

export const SignInScreen: React.FC<Props> = (props: Props) => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const navigate = useNavigate(); //router
  const auth = getAuth();
  const redirectUrl = props.signInSuccessUrl ? props.signInSuccessUrl : "/";

  // firebase ui のコンフィグ
  const uiConfig: firebaseui.auth.Config = {
    autoUpgradeAnonymousUsers: true,
    signInFlow: "popup",
    signInSuccessUrl: "/#" + redirectUrl, // 成功後の遷移先
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => true,
      signInFailure: async (error: firebaseui.auth.AuthUIError) => {
        console.log(error);
        await signInWithCredential(getAuth(), error.credential);
      },
    },
  };

  useEffect(() => {
    if (isLogin && auth.currentUser && !auth.currentUser?.isAnonymous) {
      navigate(redirectUrl);
    }
  }, [isLogin, auth.currentUser?.isAnonymous]);

  return (
    <div>
      <h1>Sign In</h1>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
