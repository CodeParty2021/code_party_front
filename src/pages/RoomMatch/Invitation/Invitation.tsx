import React from "react";
import { useInvitationState } from "./hooks/useInvitationState";
import { Head } from "components/Head/Head";
import { Facebook, Google, Mail, Twitter } from "components/icons";
import { ButtonText, IconArea, SignInButton } from "./InvitationStyle";
import {
  AccountServiceType,
  useFirebaseAuth,
} from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import { Icon24 } from "types/utils";

type ButtonServiceType = {
  service: AccountServiceType;
  Icon: React.ComponentType<Icon24>;
  text: string;
};

type Props = {};

export const RoomMatchInvitation: React.FC<Props> = () => {
  const {
    isLogin,
    errorMessage,
    roomId,
    enterBtnDisabled,
    enterBtnClickHandler,
    hostName,
  } = useInvitationState();
  const header = (
    <Head
      title="ALGOSMO"
      ogDescription={
        hostName
          ? `${hostName}からカジュアル対戦に招待されています！`
          : "ルーム情報が見つかりませんでした。"
      }
      ogType="article"
      ogImage="https://codeparty.netlify.app/img/modeselectcard_battle.png"
      ogImageHeight="412"
      ogImageWidth="616"
    />
  );

  const { signInOfFirebase } = useFirebaseAuth();

  const buttonServices: Array<ButtonServiceType> = [
    { service: "google", Icon: Google, text: "Googleでログイン" },
    { service: "twitter", Icon: Twitter, text: "Twitterでログイン" },
    { service: "facebook", Icon: Facebook, text: "Facebookでログイン" },
    { service: "email", Icon: Mail, text: "メールアドレスでログイン" },
  ];

  if (typeof roomId === "string") {
    // if not login yet, Go to SignIn
    if (isLogin == false) {
      return (
        <>
          {header}
          <div>まずはサインインしてください</div>
          {buttonServices.map((buttonService) => (
            <SignInButton
              key={buttonService.service}
              onClick={() =>
                // redirect to same page
                signInOfFirebase({
                  accountService: buttonService.service,
                  signInSuccessUrl: `/room-match/invitation/${roomId}`,
                })
              }
            >
              <IconArea>
                <buttonService.Icon size={24} />
              </IconArea>
              <ButtonText>{buttonService.text}</ButtonText>
            </SignInButton>
          ))}
        </>
      );
    }
    //display enter button
    else {
      return (
        <div>
          {header}
          <h1>次のルームに招待されています。</h1>
          <p>RoomID:{roomId}</p>
          <button
            onClick={enterBtnClickHandler}
            disabled={enterBtnDisabled}
            id="enter-btn"
          >
            入場する
          </button>
        </div>
      );
    }
  } else {
    return <p>{errorMessage || "招待リンクが無効です"} </p>;
  }
};
