import React from "react";
import { useSetNameState } from "./hooks/useSetNameState";
import { Balloon, SetNameModal, SetNameStyle } from "./SetNameStyle";

type Props = {};

export const EventSetName: React.FC<Props> = () => {
  const { loading, nameInputRef, startBtnHandler } = useSetNameState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <SetNameStyle>
      <SetNameModal>
        <Balloon src="/img/balloon.svg">名前を教えてほしい！</Balloon>
        <input ref={nameInputRef} type="text"></input>
        <button onClick={startBtnHandler}>けってい</button>
      </SetNameModal>
    </SetNameStyle>
  );
};
