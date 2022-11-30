import React from "react";
import { useLobbyState } from "./hooks/useLobbyState";

type Props = {};

export const RoomMatchLobby: React.FC<Props> = () => {
  const { roomCreateBtnDisabled, roomCreateBtnHandler, roomSearchBtnHandler } =
    useLobbyState();

  return (
    <div>
      <div>ルーム待機画面</div>
      <button
        id="create-btn"
        onClick={roomCreateBtnHandler}
        disabled={roomCreateBtnDisabled}
      >
        ルームを建てる
      </button>
      <button id="search-btn" onClick={roomSearchBtnHandler}>
        ルームを探す
      </button>
    </div>
  );
};
