import { Button } from "components/Button/Button";
import React from "react";
import { Background } from "../components/Background";
import { useSetNameState } from "./hooks/useSetNameState";
import {
  AlgoBox,
  AlgoHeadMini,
  Message,
  ModalTitle,
  NameInput,
} from "./SetNameStyle";
import { Balloon, SetNameModal, SetNameStyle } from "./SetNameStyle";
type Props = {};
import { Load } from "pages/Code/Coding/components/Load/Load";

export const EventSetName: React.FC<Props> = () => {
  const {
    loading,
    nameInputRef,
    startBtnHandler,
    nameInputHandler,
    btnDisabled,
  } = useSetNameState();
  if (loading) {
    return <div>
      <Load/>
    </div>;
  }
  return (
    <>
      <SetNameStyle>
        <SetNameModal>
          <ModalTitle>
            <span>はじめて遊ぶ</span>
          </ModalTitle>
          <AlgoBox>
            <AlgoHeadMini />
            <Balloon src="/img/balloon.svg" />
            <Message>名前を教えてほしい！</Message>
          </AlgoBox>
          <NameInput
            ref={nameInputRef}
            type="text"
            onChange={nameInputHandler}
          ></NameInput>
          <Button
            onClick={startBtnHandler}
            color="pink"
            value="けってい"
            status={btnDisabled ? "disabled" : "default"}
          />
        </SetNameModal>
      </SetNameStyle>
      <Background />
    </>
  );
};
