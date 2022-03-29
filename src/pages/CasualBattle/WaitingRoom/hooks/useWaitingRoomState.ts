import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { CodeType, useFetchCodes } from "hooks/CodeAPIHooks/useFetchCodes";
import { UserState, UserAction } from "services/RoomSync/RoomSync";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { User } from "services/user/user";

export type IResponse = {
  user: User | null;
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
  ready: boolean;

  readyBtnHandler: () => void;
  readyBtnDisabled: boolean;
  exitBtnHandler: () => void;
  startBtnDisabled: boolean;
  startBtnHandler: () => void;
  kickUserHandler: (userId: string) => void;
  code: {
    codes: CodeType[];
    loading: boolean;
  };
  selectedCodeId: string;
  onChangeSelectedCodeId: (codeId: string) => void;
};

export const useWaitingRoomState = (): IResponse => {
  const {
    room,
    isHost,
    updateRoomInfo,
    updateMember,
    updateOtherMember,
    exitRoom,
  } = useRoomSync();
  const { data: codes = [], loading } = useFetchCodes();
  const [preRoomStatus, setPreRoomStatus] = useState<"waiting" | "watching">(
    "watching"
  );
  const [selectedCodeId, setSelectedCodeId] = useState("");
  const [ready, setReady] = useState(false);
  const [readyBtnDisabled, setReadyBtnDisabled] = useState(true);
  const [startBtnDisabled, setStartBtnDisabled] = useState(true);
  let { user } = useSelector((state: RootState) => state.user);

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

  // 準備ボタンの有効化
  useEffect(() => {
    //コードが選択されたら準備完了ボタンを押せるようにする
    if (selectedCodeId != "") {
      setReadyBtnDisabled(false);
    }
  }, [selectedCodeId]);

  // ルームステータスがwaitingからwatchingになったら観戦画面に遷移
  useEffect(() => {
    if (room.info) {
      if (preRoomStatus == "waiting" && room.info.status == "watching") {
        navigate("/casual-battle/result");
      }
      setPreRoomStatus(room.info?.status);
    }
  }, [room.info?.status]);

  // ready状態をDBに反映
  useEffect(() => {
    updateMember({
      ready: ready,
      codeId: selectedCodeId,
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
        setStartBtnDisabled(newDisabled);
      }
      // 全員がWaitingRoomに返ってきたらroomの状態をwaitingに更新する
      let newRoomStatus: "waiting" | "watching" = "waiting";
      for (let key of Object.keys(room.members)) {
        if (room.members[key].status == "watching") {
          newRoomStatus = "watching";
        }
      }
      if (newRoomStatus == "waiting" && room.info?.status == "watching") {
        updateRoomInfo({
          status: "waiting",
          analyzingResult: null,
        });
      }
    }
  }, [room.members, isHost]);

  // kick処理 member.status = kickingの場合そのユーザをキックする
  useEffect(() => {
    if (user) {
      for (let key of Object.keys(room.members)) {
        if (room.members[key].status == "kicking" && user.id == key) {
          exitRoom();
        }
      }
    }
  }, [room.members]);

  // ---- イベントハンドラ ---- //

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

  const _onChangeSelectedCodeId = (codeId: string) => {
    setSelectedCodeId(codeId);
  };

  const _kickUserBtnHandler = (userId: string) => {
    updateOtherMember(userId, { status: "kicking" });
  };

  return {
    user: user,
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
    ready: ready,

    readyBtnHandler: _readyBtnHandler,
    readyBtnDisabled: readyBtnDisabled,
    exitBtnHandler: _exitBtnHandler,
    startBtnDisabled: startBtnDisabled,
    startBtnHandler: _startBtnHandler,
    kickUserHandler: _kickUserBtnHandler,
    code: {
      codes: codes,
      loading: loading,
    },
    selectedCodeId: selectedCodeId,
    onChangeSelectedCodeId: _onChangeSelectedCodeId,
  };
};
