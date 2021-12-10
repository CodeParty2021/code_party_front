import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "services/user/user";

type Props = {};

export const SignOutButton: React.FC<Props> = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(signOut())}>SignOut</button>
    </div>
  );
};
