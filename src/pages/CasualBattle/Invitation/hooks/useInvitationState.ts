import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RootState } from "store";
import { useSelector } from "react-redux";

export type IResponse = {
  isLogin: boolean;
  errorMessage?: string;
  roomId?: string;
  enterBtnDisabled: boolean;
  enterBtnClickHandler: () => void;
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

  useEffect(() => {
    if (room.isEntered) {
      navigate("/casual-battle/waiting-room");
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

  return {
    isLogin: isLogin,
    errorMessage: errorMessage,
    roomId: roomId,
    enterBtnDisabled: enterBtnDisabled,
    enterBtnClickHandler: _enterBtnHandler,
  };
};
