import React, { useEffect, useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../../config";

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

type Prop = {};

export const SignInScreen: React.FC<Prop> = () => {
  //サインインサインアウトで発火するメソッド
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  //const dispatch = useDispatch();
  // state の取得
  //const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  );
};
