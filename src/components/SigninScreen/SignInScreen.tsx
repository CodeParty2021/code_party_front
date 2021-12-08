import React, { useEffect, useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../../config";
import axios from "axios";
import { setUser } from "services/user/user";
import { useDispatch } from "react-redux";

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  //signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

type Prop = {};
type ErrorType = {
  flg: boolean;
  message: string | null;
};

export const SignInScreen: React.FC<Prop> = () => {
  const [error, setError] = useState<ErrorType>({ flg: false, message: null }); // Local signed-in state.
  const dispatch = useDispatch();
  // https://scrapbox.io/frontend-akihito/Firebase_Auth_%E3%81%AEonAuthStateObserver%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        // onAuthStateChanged
        if (user) {
          user
            .getIdToken()
            .then((idToken: string) => {
              //promiseが戻り値のときはこういう書き方をする
              console.log(idToken);
              axios
                .get("http://localhost:3001/signin?id_token=" + idToken)
                .then(() => {
                  dispatch(
                    setUser({
                      idToken: idToken,
                      displayName: user.displayName as string,
                      email: user.email as string,
                      photoUrl: user.photoURL as string,
                    })
                  );
                });
            })
            .catch((error: any) => {
              console.log(error);
              setError({ flg: true, message: "エラー" });
            }); //jwtが返ってくる
          setError({ flg: true, message: "Done" });
        }
      });
    return () => unregisterAuthObserver();
  }, []);
  return (
    <div>
      <h1>My App</h1>
      <h3>{error && error.message}</h3>
      <p>Please sign-in:</p>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
