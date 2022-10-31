import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useFetchHost } from "hooks/RoomSyncHooks/useFetchHost";

export type IResponse = {
  isLogin: boolean;
  errorMessage?: string;
  roomId?: string;
  enterBtnDisabled: boolean;
  enterBtnClickHandler: () => void;
  hostName?: string;
};

export const useInvitationState = (): IResponse => {
  const { roomId } = useParams<Params<string>>();
  const { isLogin } = useSelector((state: RootState) => state.user);
  const [enterBtnDisabled, setEnterBtnDisabled] = useState(false);
  const { room, enterRoom } = useRoomSync();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { data: host, getHost } = useFetchHost();

  useEffect(() => {
    if (room.isEntered) {
      navigate("/room-match/waiting-room");
    }
  }, [room.isEntered]);

  //入場ボタン
  const _enterBtnHandler = () => {
    if (typeof roomId === "string") {
      setEnterBtnDisabled(true);
      enterRoom(roomId).catch(() => {
        setEnterBtnDisabled(false);
      });
    } else {
      setErrorMessage("招待リンクが無効です。");
    }
  };

  useEffect(() => {
    if (roomId) {
      getHost(roomId);
    }
  }, []);

  return {
    isLogin: isLogin,
    errorMessage: errorMessage,
    roomId: roomId,
    enterBtnDisabled: enterBtnDisabled,
    enterBtnClickHandler: _enterBtnHandler,
    hostName: host?.displayName,
  };
};
