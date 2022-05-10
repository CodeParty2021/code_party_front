import React from "react";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
import { useInvitationState } from "./hooks/useInvitationState";

type Props = {};

export const CasualBattleInvitation: React.FC<Props> = () => {
  const {
    isLogin,
    errorMessage,
    roomId,
    enterBtnDisabled,
    enterBtnClickHandler,
  } = useInvitationState();

  if (typeof roomId === "string") {
    // if not login yet, Go to SignIn
    if (isLogin == false) {
      return (
        <SignInScreen
          signInSuccessUrl={`/casual-battle/invitation/${roomId}`}
        />
      );
    }
    //display enter button
    else {
      return (
        <div>
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
