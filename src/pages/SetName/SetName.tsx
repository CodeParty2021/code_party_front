import { Button } from "components/Button/Button";
import React from "react";
import { StarBackground } from "../../components/StarBackground/StarBackground";
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
import { Loading } from "pages/Loading/Loading";

export const SetName: React.FC<Props> = () => {
  const {
    loading,
    nameInputRef,
    startBtnHandler,
    nameInputHandler,
    btnDisabled,
  } = useSetNameState();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <StarBackground>
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
      </StarBackground>
    </>
  );
};
