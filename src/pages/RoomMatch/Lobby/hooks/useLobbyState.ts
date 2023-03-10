import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  isLoading: boolean;
  errorMessage: string;
  roomIdRef: RefObject<HTMLInputElement>;
  createRoomHandler: () => void;
  createRoomDisabled: boolean;
  enterRoomHandler: () => void;
  enterRoomDisabled: boolean;
  backButtonHandler: () => void;
};

export const useLobbyState = (): IResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [createRoomDisabled, setCreateRoomDisabled] = useState<boolean>(false);
  const [enterRoomDisabled, setEnterRoomDisabled] = useState<boolean>(false);
  const { room, createRoom, enterRoom } = useRoomSync();
  const navigate = useNavigate();
  const roomIdRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    if (room.isEntered) {
      navigate("/room-match/waiting-room");
    }
  }, [room.isEntered]);

  // ルーム
  const _createRoomHandler = useCallback(() => {
    setIsLoading(true);
    createRoom().catch(() => {
      navigate("/error");
    });
  }, []);

  const _enterRoomHandler = useCallback(() => {
    const value = roomIdRef.current?.value;

    setCreateRoomDisabled(true);
    setEnterRoomDisabled(true);
    if (typeof value === "string") {
      if (value == "") {
        setErrorMessage("値を入力してください。");
      } else {
        enterRoom(value).catch((e) => {
          if (e.message == "roomId is empty") {
            setErrorMessage("値を入力してください。");
          } else if (e.message == "roomId is not found") {
            setErrorMessage("ルームIDが無効です。");
          } else if (e.message == "room is full") {
            setErrorMessage("ルームが満員です。");
          }
        });
      }
    } else {
      setErrorMessage("入力が不正です。");
    }
    setCreateRoomDisabled(false);
    setEnterRoomDisabled(false);
  }, []);

  // 戻るボタン
  const _backButtonHandler = useCallback(() => {
    navigate("/select-mode");
  }, []);

  return {
    isLoading,
    errorMessage,
    roomIdRef,
    createRoomHandler: _createRoomHandler,
    createRoomDisabled,
    enterRoomHandler: _enterRoomHandler,
    enterRoomDisabled,
    backButtonHandler: _backButtonHandler,
  };
};
