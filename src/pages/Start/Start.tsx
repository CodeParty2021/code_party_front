import { BackLink } from "components/BackLink/BackLink";
import { Google, Mail } from "components/icons";
import { StarBackground } from "components/StarBackground/StarBackground";
import { AccountServiceType } from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import { Loading } from "pages/Loading/Loading";
import { BackgroundBlur } from "pages/SetName/SetNameStyle";
import React from "react";
import { Icon24 } from "types/utils";
import { useStartState } from "./hooks/useStartState";
import {
  AlgoBox,
  AlgoHeadMini,
  BackLinkPosition,
  Balloon,
  ButtonText,
  IconArea,
  Message,
  ModalTitle,
  SetNameModal,
  SetNameStyle,
  SignInButton,
} from "./Startstyle";
type ButtonServiceType = {
  service: AccountServiceType;
  Icon: React.ComponentType<Icon24>;
  text: string;
};

export const Start: React.FC = () => {
  const { loading, algoMessage, signInButtonsHandler, backLinkButtonHandler } =
    useStartState();
  const buttonServices: Array<ButtonServiceType> = [
    { service: "google", Icon: Google, text: "Googleでログイン" },
    { service: "email", Icon: Mail, text: "メールアドレスでログイン" },
  ];

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
          {buttonServices.map((buttonService) => (
            <SignInButton
              key={buttonService.service}
              onClick={() => signInButtonsHandler(buttonService.service)}
            >
              <IconArea>
                <buttonService.Icon size={24} />
              </IconArea>
              <ButtonText>{buttonService.text}</ButtonText>
            </SignInButton>
          ))}
          <BackgroundBlur />
        </SetNameModal>
      </SetNameStyle>
    </StarBackground>
  );
};
