import React from "react";
import { useWaitingRoomState } from "./hooks/useWaitingRoomState";

type Props = {};

export const CasualBattleWaitingRoom: React.FC<Props> = () => {
  const {
    user,
    roomInfo,
    isHost,
    status,
    ready,
    readyBtnHandler,
    readyBtnDisabled,
    exitBtnHandler,
    startBtnDisabled,
    startBtnHandler,
    kickUserHandler,
    code,
    selectedCodeId,
    onChangeSelectedCodeId,
  } = useWaitingRoomState();
  if (user) {
    return (
      <div>
        <div>ルーム待機画面</div>
        <div>
          <button
            id="start-btn"
            onClick={startBtnHandler}
            disabled={startBtnDisabled}
          >
            マッチ開始
          </button>
        </div>
        <button
          id="ready-btn"
          onClick={readyBtnHandler}
          disabled={readyBtnDisabled}
        >
          {ready ? "取り消し" : "準備完了！"}
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
                {roomInfo.members[key].status == "watching"
                  ? "観戦中"
                  : roomInfo.members[key].status == "disconnect"
                  ? "切断"
                  : roomInfo.members[key].status == "waiting"
                  ? roomInfo.members[key].ready
                    ? "準備完了"
                    : "準備中"
                  : "No Status"}
                {user.id !== key ? (
                  <button
                    id={`kick-btn-${key}`}
                    onClick={() => kickUserHandler(key)}
                  >
                    キックする
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </ul>
        <div>
          <h3>コード選択</h3>
          {code.loading ? (
            "コード一覧を取得中"
          ) : code.codes.length == 0 ? (
            "コードが見つかりませんでした"
          ) : (
            <>
              {code.codes.map((code) => (
                <label key={code.id}>
                  <input
                    type="radio"
                    name="codes"
                    value={code.id}
                    checked={code.id === selectedCodeId}
                    onChange={(e) => onChangeSelectedCodeId(e.target.value)}
                  />
                  ステップ：{code.step}, 作成日：{code.createdAt}, 内容:{" "}
                  {code.codeContent.slice(0, 10)}
                  <br />
                </label>
              ))}
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <div>ログインが必要です</div>;
  }
};
