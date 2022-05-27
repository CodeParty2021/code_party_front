import React from "react";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
import { useInvitationState } from "./hooks/useInvitationState";
import { Head } from "components/Head/Head";

type Props = {};

export const CasualBattleInvitation: React.FC<Props> = () => {
  const {
    isLogin,
    errorMessage,
    roomId,
    enterBtnDisabled,
    enterBtnClickHandler,
    hostId,
  } = useInvitationState();

  if (typeof roomId === "string") {
    // if not login yet, Go to SignIn
    if (isLogin == false) {
      return (
        <>
          <Head
            title="招待されています"
            ogDescription={`HostId:${hostId}からRoomId:${roomId}に招待されています。`}
            ogType="article"
          />
          <SignInScreen
            signInSuccessUrl={`/casual-battle/invitation/${roomId}`}
          />
        </>
      );
    }
    //display enter button
    else {
      return (
        <div>
          <Head
            title="招待されています"
            ogDescription={`HostId:${hostId}からRoomId:${roomId}に招待されています。`}
            ogType="article"
          />
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
