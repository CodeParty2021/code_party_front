import React from "react";
import { useSetNameState } from "./hooks/useSetNameState";

type Props = {};

export const EventSetName: React.FC<Props> = () => {
  const { loading, error, nameInputRef, startBtnHandler } = useSetNameState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <div>
      <h1>おなまえをおしえてね</h1>
      <p>{error}</p>
      <input ref={nameInputRef} type="text"></input>
      <button onClick={startBtnHandler}>けってい</button>
    </div>
  );
};
