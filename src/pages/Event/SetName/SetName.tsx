import React from "react";
import { useSetNameState } from "./hooks/useSetNameState";

type Props = {};

export const EventSetName: React.FC<Props> = () => {
  const { nameInputRef, startBtnHandler } = useSetNameState();
  return (
    <div>
      <h1>おなまえをおしえてね</h1>
      <input ref={nameInputRef} type="text"></input>
      <button onClick={startBtnHandler}>けってい</button>
    </div>
  );
};
