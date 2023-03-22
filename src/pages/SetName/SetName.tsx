import { Button } from "components/Button/Button";
import React from "react";
import { StarBackground } from "../../components/StarBackground/StarBackground";
import { useSetNameState } from "./hooks/useSetNameState";
import {
  AlgoBox,
  AlgoHeadMini,
  BackgroundBlur,
  BackLinkPosition,
  Message,
  ModalTitle,
  NameInput,
  PlanetPictureWrapperStyle,
} from "./SetNameStyle";
import { Balloon, SetNameModal, SetNameStyle } from "./SetNameStyle";
type Props = {};
import { Loading } from "pages/Loading/Loading";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import { BackLink } from "components/BackLink/BackLink";

export const SetName: React.FC<Props> = () => {
  const {
    loading,
    nameInputRef,
    startBtnHandler,
    nameInputChangeHandler,
    nameInputKeydownHandler,
    blackLinkButtonHandler,
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
    <StarBackground>
      <BackLinkPosition>
        <BackLink
          backMessage="トップに戻る"
          onClick={blackLinkButtonHandler}
          iconColor="black"
        />
      </BackLinkPosition>
      <PlanetPictureWrapperStyle>
        <PlanetPicture color="blue" size={"289px"} />
      </PlanetPictureWrapperStyle>
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
            onChange={nameInputChangeHandler}
            onKeyDown={nameInputKeydownHandler}
          ></NameInput>
          <Button
            onClick={startBtnHandler}
            color="pink"
            value="つぎへ"
            status={btnDisabled ? "disabled" : "default"}
          />
          <BackgroundBlur />
        </SetNameModal>
      </SetNameStyle>
    </StarBackground>
  );
};
