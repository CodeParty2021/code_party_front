import React from "react";
import { useSearchRoomState } from "./hooks/useSearchRoomState";

type Props = {};

export const CasualBattleSearchRoom: React.FC<Props> = () => {
  const {roomIdTextBoxValue, roomIdTextBoxChangeHandler, enterBtnClickHandler} = useSearchRoomState();

  return (
    <div>
      <div>ルームIDを入力する</div>
      <input
        value={roomIdTextBoxValue}
        onChange={(e) => roomIdTextBoxChangeHandler(e.target.value)}
      ></input>
      <button onClick={enterBtnClickHandler}>ルームに入る</button>
    </div>
  );
};
