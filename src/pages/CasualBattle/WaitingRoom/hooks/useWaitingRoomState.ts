import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { UserState, UserAction } from "services/RoomSync/RoomSync";

export type IResponse = {
  roomInfo: {
    roomId: string;
    host: UserState;
    memberKeys: string[];
    members: { [id: string]: UserState };
    actionKeys: string[];
    actions: { [id: string]: UserAction };
  };
  isHost: boolean;
  status?: "waiting" | "watching";
  readyBtnHandler: () => void;
  exitBtnHandler: () => void;
  startBtnDisabled: boolean;
  startBtnHandler: () => void;
};

export const useWaitingRoomState = (): IResponse => {
  const { room, isHost, updateRoomInfo, updateMember, exitRoom } = useRoomSync();
  const [preRoomStatus, setPreRoomStatus] = useState<"waiting" | "watching">("watching");
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dummyUser: UserState = {
    displayName: "",
    status: "disconnect",
    ready: false,
  };

  // ユーザ状態を更新
  useEffect(() => {
    updateMember({
      status: "waiting",
    });
  }, []);

  // DB上で退出処理が完了したら退出
  useEffect(() => {
    if (!room.isEntered) {
      navigate("/casual-battle");
    }
  }, [room.isEntered]);

  // ルームステータスがwaitingからwatchingになったら観戦画面に遷移
  useEffect(() => {
    if(room.info){
      if (preRoomStatus == "waiting" && room.info.status == "watching"){
        navigate("/casual-battle/result");
      }
      setPreRoomStatus(room.info?.status);
    }
  }, [room.info?.status]);

  // ready状態をDBに反映
  useEffect(() => {
    updateMember({
      ready: ready,
    });
  }, [ready]);

  // ホストの処理
  useEffect(() => {
    if (isHost) {
      if (room.info && room.info.status == "waiting") {
        // 全員が準備完了になったら開始ボタンを有効にする
        let newDisabled = false;
        for (let key of Object.keys(room.members)) {
          if (!room.members[key].ready) {
            newDisabled = true;
            break;
          }
        }
        setDisabled(newDisabled);
      }

      // 全員がWaitingRoomに返ってきたらroomの状態をwaitingに更新する
      let newRoomStatus: "waiting" | "watching" = "waiting";
      for (let key of Object.keys(room.members)) {
        if (room.members[key].status == "watching") {
          newRoomStatus = "watching";
        }
      }
      if(newRoomStatus == "waiting" && room.info?.status == "watching") {
        updateRoomInfo({
          status: "waiting",
        });
      }
    }
  }, [room.members, isHost]);

  // ---- ボタンクリックイベント ---- //

  const _readyBtnHandler = () => {
    setReady(!ready);
  };

  const _exitBtnHandler = () => {
    exitRoom();
  };

  const _startBtnHandler = () => {
    updateRoomInfo({
      status: "watching",
    });
  };

  return {
    roomInfo: {
      roomId: room.id ? room.id : "",
      host:
        room.info && room.info.host in room.members
          ? room.members[room.info.host]
          : dummyUser,
      memberKeys: room.sortedKeysOfMembers,
      members: room.members,
      actionKeys: room.sortedKeysOfActions,
      actions: room.actions,
    },
    isHost: isHost,
    status: room.info?.status,
    readyBtnHandler: _readyBtnHandler,
    exitBtnHandler: _exitBtnHandler,
    startBtnDisabled: disabled,
    startBtnHandler: _startBtnHandler,
  };
};
