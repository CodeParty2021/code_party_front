import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  roomCreateBtnHandler: () => void;
  roomSearchBtnHandler: () => void;
};

export const useLobbyState = (): IResponse => {
  const { room, createRoom } = useRoomSync();
  const navigate = useNavigate();

  useEffect(() => {
    if (room.isEntered) {
      navigate("/casual-battle/waiting-room");
    }
  }, [room.isEntered]);

  const _roomCreateBtnHandler = () => {
    createRoom();
  };

  const _roomSearchBtnHandler = () => {
    navigate("/casual-battle/search-room");
  };

  return {
    roomCreateBtnHandler: _roomCreateBtnHandler,
    roomSearchBtnHandler: _roomSearchBtnHandler,
  };
};
