import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  roomIdTextBoxValue: string;
  roomIdTextBoxChangeHandler: any; // (value: string) => void;にしたいけど，no-unused-varsにひっかかる．
  enterBtnClickHandler: () => void;
};

export const useSearchRoomState = (): IResponse => {
  const { room, enterRoom } = useRoomSync();
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (room.isEntered) {
      navigate("/casual-battle/waiting-room");
    }
  }, [room.isEntered]);

  const _roomIdTextBoxChangeHandler = (value: string) => {
    setRoomId(value);
  };

  const _enterBtnHandler = () => {
    enterRoom(roomId);
  };

  return {
    roomIdTextBoxValue: roomId,
    roomIdTextBoxChangeHandler: _roomIdTextBoxChangeHandler,
    enterBtnClickHandler: _enterBtnHandler,
  };
};
