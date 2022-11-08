import React from "react";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
import { useInvitationState } from "./hooks/useInvitationState";
import { Head } from "components/Head/Head";

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

  if (typeof roomId === "string") {
    // if not login yet, Go to SignIn
    if (isLogin == false) {
      return (
        <>
          {header}
          <SignInScreen signInSuccessUrl={`/room-match/invitation/${roomId}`} />
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
