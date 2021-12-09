import React from "react";
import { signOut } from "services/user/user";

type Props = {};

export const SignOutButton: React.FC<Props> = () => {
  return (
    <div>
      <button onClick={signOut}>SignIn</button>
    </div>
  );
};
