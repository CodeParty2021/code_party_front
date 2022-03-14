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
  readyBtnHandler: () => void;
  exitBtnHandler: () => void;
  startBtnDisabled: boolean;
  startBtnHandler: () => void;
};

export const useWaitingRoomState = (): IResponse => {
  const { room, isHost, updateMember, exitRoom } = useRoomSync();
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dummyUser: UserState = {
    displayName: "",
    ready: false,
  };

  useEffect(() => {
    if (!room.isEntered) {
      navigate("/casual-battle");
    }
  }, [room.isEntered]);

  useEffect(() => {
    updateMember({
      ready: ready,
    });
  }, [ready]);

  useEffect(() => {
    if (isHost) {
      for (let key of Object.keys(room.members)) {
        if (!room.members[key].ready) {
          setDisabled(true);
          return;
        }
      }
      setDisabled(false);
    } else {
      setDisabled(true);
      return;
    }
  }, [room.members, isHost]);

  const _readyBtnHandler = () => {
    setReady(!ready);
  };

  const _exitBtnHandler = () => {
    exitRoom();
  };

  const _startBtnHandler = () => {
    navigate("/casual-battle/result");
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
    readyBtnHandler: _readyBtnHandler,
    exitBtnHandler: _exitBtnHandler,
    startBtnDisabled: disabled,
    startBtnHandler: _startBtnHandler,
  };
};
