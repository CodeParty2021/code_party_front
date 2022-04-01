import React from "react";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
type Props = {};

export const FirebaseLoginForm: React.FC<Props> = () => {
  return (
    <div>
      <p>ログイン情報を入力して!</p>
      <SignInScreen signInSuccessUrl="/mode-select" />
    </div>
  );
};
