import React from "react";
import { useLobbyState } from "./hooks/useLobbyState";

type Props = {};

export const CasualBattleLobby: React.FC<Props> = () => {
  const {roomCreateBtnHandler, roomSearchBtnHandler} = useLobbyState();

  return (
    <div>
      <div>ルーム待機画面</div>
      <button onClick={roomCreateBtnHandler}>ルームを建てる</button>
      <button onClick={roomSearchBtnHandler}>ルームを探す</button>
    </div>
  );
};
