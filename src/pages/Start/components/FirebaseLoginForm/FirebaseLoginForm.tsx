import { SignInScreen } from "components/SignInScreen/SignInScreen";
import React from "react";

type Props = {};

export const FirebaseLoginForm: React.FC<Props> = () => {
  return (
    <div>
      <p>ログイン情報を入力して！</p>
      <SignInScreen signInSuccessUrl="/#/stages" />
    </div>
  );
};
