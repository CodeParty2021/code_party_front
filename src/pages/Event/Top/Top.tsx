import React from "react";
import { useTopState } from "./useTopState";

type Props = {};

export const EventTop: React.FC<Props> = () => {
  const { anonymousLoginBtnDisabled, anonymousLoginBtnHandler } = useTopState();
  return (
    <div>
      <h1>EventTopページ</h1>
      <button
        disabled={anonymousLoginBtnDisabled}
        onClick={anonymousLoginBtnHandler}
      >
        いざスタート！
      </button>
    </div>
  );
};
