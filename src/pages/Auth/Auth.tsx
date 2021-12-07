import { SignInScreen } from "components/SigninScreen/SignInScreen";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { increment, decrement } from "services/auth/auth";

import { RootState } from "store";
type Prop = {};

export const Auth: React.FC<Prop> = () => {
  //サインインサインアウトで発火するメソッド

  const dispatch = useDispatch();
  // state の取得
  const counter = useSelector((state: RootState) => state.counter.count);

  return (
    <div>
      <div>
        <h1>Auth</h1>
        <h2>{counter}</h2>
        <button onClick={() => dispatch(increment())} />
        <button onClick={() => dispatch(decrement())} />
      </div>
      <div>
        <SignInScreen></SignInScreen>
      </div>
    </div>
  );
};
