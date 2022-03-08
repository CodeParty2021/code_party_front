import React from "react";
import { useWaitingRoomState } from "./hooks/useWaitingRoomState";

type Props = {};

export const CasualBattleWaitingRoom: React.FC<Props> = () => {
  const {
    roomInfo,
    isHost,
    readyBtnHandler,
    exitBtnHandler,
    startBtnDisabled,
    startBtnHandler,
  } = useWaitingRoomState();

  return (
    <div>
      <div>ルーム待機画面</div>
      <div>
        <button>コード選択</button>
        <button
          id="start-btn"
          onClick={startBtnHandler}
          disabled={startBtnDisabled}
        >
          マッチ開始
        </button>
      </div>
      <button id="ready-btn" onClick={readyBtnHandler}>
        準備完了
      </button>
      <button id="exit-btn" onClick={exitBtnHandler}>
        退出
      </button>
      <ul>
        <li>Room ID: {roomInfo.roomId}</li>
        <li>Host: {roomInfo.host.displayName}</li>
        <li>I am {isHost ? "" : "not"} a host.</li>
        <li>Members:</li>
        <ul>
          {roomInfo.memberKeys.map((key) => (
            <li key={key}>
              {roomInfo.members[key].displayName} :{" "}
              {roomInfo.members[key].ready ? "準備完了" : "準備中"}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
