import React from "react";
import { useSearchRoomState } from "./hooks/useSearchRoomState";

type Props = {};

export const CasualBattleSearchRoom: React.FC<Props> = () => {
  const {
    roomIdTextBoxValue,
    roomIdTextBoxChangeHandler,
    enterBtnDisabled,
    enterBtnClickHandler,
  } = useSearchRoomState();

  return (
    <div>
      <div>ルームIDを入力する</div>
      <input
        id="roomid-textbox"
        value={roomIdTextBoxValue}
        onChange={(e) => roomIdTextBoxChangeHandler(e.target.value)}
      ></input>
      <button
        id="enter-btn"
        onClick={enterBtnClickHandler}
        disabled={enterBtnDisabled}
      >
        ルームに入る
      </button>
    </div>
  );
};
