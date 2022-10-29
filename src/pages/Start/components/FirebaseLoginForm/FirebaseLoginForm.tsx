import React from "react";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
type Props = {};

export const FirebaseLoginForm: React.FC<Props> = () => {
  return (
    <div>
      <SignInScreen signInSuccessUrl="/select-mode" />
    </div>
  );
};
