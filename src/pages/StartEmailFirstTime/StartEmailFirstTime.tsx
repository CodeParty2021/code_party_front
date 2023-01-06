import { BackLink } from "components/BackLink/BackLink";
import { Button } from "components/Button/Button";
import { StarBackground } from "components/StarBackground/StarBackground";
import { Loading } from "pages/Loading/Loading";
import { BackgroundBlur } from "pages/SetName/SetNameStyle";
import React from "react";
import { useStartState } from "./hooks/useStartEmailState";
import {
  AlgoBox,
  AlgoHeadMini,
  BackLinkPosition,
  Balloon,
  Message,
  ModalTitle,
  SetNameModal,
  SetNameStyle,
  TextInput,
} from "./StartEmailstyle";

export const StartEmailFirstTime: React.FC = () => {
  const {
    loading,
    algoMessage,
    emailRef,
    passwordRef,
    emailChangeHandler,
    passwordChangeHandler,
    startBtnHandler,
    backLinkButtonHandler,
    btnDisabled,
  } = useStartState();
  return loading ? (
    <Loading />
  ) : (
    <StarBackground>
      <BackLinkPosition>
        <BackLink
          backMessage="トップに戻る"
          onClick={backLinkButtonHandler}
          iconColor="black"
        />
      </BackLinkPosition>
      <SetNameStyle>
        <SetNameModal>
          <ModalTitle>
            <span>ログインして遊ぶ</span>
          </ModalTitle>
          <AlgoBox>
            <AlgoHeadMini />
            <Balloon src="/img/balloon.svg" />
            <Message>{algoMessage}</Message>
          </AlgoBox>

          <TextInput
            ref={emailRef}
            type="email"
            onChange={emailChangeHandler}
            placeholder="メールアドレス"
          ></TextInput>

          <TextInput
            ref={passwordRef}
            type="password"
            onChange={passwordChangeHandler}
            placeholder="パスワード"
          ></TextInput>
          <Button
            onClick={startBtnHandler}
            color="pink"
            value="けってい"
            status={btnDisabled ? "disabled" : "default"}
          />
          <BackgroundBlur />
        </SetNameModal>
      </SetNameStyle>
    </StarBackground>
  );
};
