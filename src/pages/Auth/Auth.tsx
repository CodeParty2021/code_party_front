import { SignInScreen } from "components/SigninScreen/SignInScreen";

import React from "react";

type Prop = {};

// firebaseの実装はこれを参考にした
// https://github.com/firebase/firebaseui-web-react

export const Auth: React.FC<Prop> = () => {
  return (
    <div>
      <div>
        <h1>Auth</h1>
      </div>
      <div>
        <SignInScreen></SignInScreen>
      </div>
    </div>
  );
};
