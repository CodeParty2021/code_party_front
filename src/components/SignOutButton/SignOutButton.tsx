import React from "react";
import { useDispatch } from "react-redux";
import { signOutAsync } from "services/user/user";

type Props = {};

export const SignOutButton: React.FC<Props> = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(signOutAsync())}>SignOut</button>
    </div>
  );
};
