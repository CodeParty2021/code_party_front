import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  roomCreateBtnDisabled: boolean;
  roomCreateBtnHandler: () => void;
  roomSearchBtnHandler: () => void;
};

export const useLobbyState = (): IResponse => {
  const [roomCreateBtnDisabled, setRoomCreateBtnDisabled] = useState(false);
  const { room, createRoom } = useRoomSync();
  const navigate = useNavigate();

  useEffect(() => {
    if (room.isEntered) {
      navigate("/casual-battle/waiting-room");
    }
  }, [room.isEntered]);

  const _roomCreateBtnHandler = () => {
    setRoomCreateBtnDisabled(true);
    createRoom().catch(() => {
      setRoomCreateBtnDisabled(false);
    });
  };

  const _roomSearchBtnHandler = () => {
    navigate("/casual-battle/search-room");
  };

  return {
    roomCreateBtnDisabled: roomCreateBtnDisabled,
    roomCreateBtnHandler: _roomCreateBtnHandler,
    roomSearchBtnHandler: _roomSearchBtnHandler,
  };
};
