import React from "react";
import { useAnonymousLoginFormState } from "./hooks/useAnonymousLoginFormState";

// 名前だけ入力ログイン（アノニマスログイン用のフォーム

type Props = {};

export const AnonymousLoginForm: React.FC<Props> = () => {
  const { anonymousLoginBtnDisabled, anonymousLoginBtnHandler } =
    useAnonymousLoginFormState();
  return (
    <div>
      <h1>匿名で始める</h1>
      <button
        id="login-btn"
        onClick={anonymousLoginBtnHandler}
        disabled={anonymousLoginBtnDisabled}
      >
        匿名ログイン
      </button>
    </div>
  );
};
