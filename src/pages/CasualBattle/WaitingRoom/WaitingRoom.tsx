import React from "react";
import { useWaitingRoomState } from "./hooks/useWaitingRoomState";

type Props = {};

export const CasualBattleWaitingRoom: React.FC<Props> = () => {
  const {
    roomInfo,
    isHost,
    status,
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
        <li>Status: {status}</li>
        <li>I am {isHost ? "" : "not"} a host.</li>
        <li>Members:</li>
        <ul>
          {roomInfo.memberKeys.map((key) => (
            <li key={key}>
              {roomInfo.members[key].displayName} :{" "}
              {
                roomInfo.members[key].status == "watching" ? "観戦中" :
                roomInfo.members[key].status == "disconnect" ? "切断" :
                roomInfo.members[key].status == "waiting" ? roomInfo.members[key].ready ? "準備完了" : "準備中" :
                "No Status"
              }
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
