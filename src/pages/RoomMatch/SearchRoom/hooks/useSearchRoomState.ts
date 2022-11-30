import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";

export type IResponse = {
  roomIdTextBoxValue: string;
  roomIdTextBoxChangeHandler: (value: string) => void;
  enterBtnDisabled: boolean;
  enterBtnClickHandler: () => void;
};

export const useSearchRoomState = (): IResponse => {
  const { room, enterRoom } = useRoomSync();
  const [roomId, setRoomId] = useState("");
  const [enterBtnDisabled, setEnterBtnDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (room.isEntered) {
      navigate("/room-match/waiting-room");
    }
  }, [room.isEntered]);

  const _roomIdTextBoxChangeHandler = (value: string) => {
    setRoomId(value);
  };

  const _enterBtnHandler = () => {
    setEnterBtnDisabled(true);
    enterRoom(roomId).catch(() => {
      setEnterBtnDisabled(false);
    });
  };

  return {
    roomIdTextBoxValue: roomId,
    roomIdTextBoxChangeHandler: _roomIdTextBoxChangeHandler,
    enterBtnDisabled: enterBtnDisabled,
    enterBtnClickHandler: _enterBtnHandler,
  };
};
