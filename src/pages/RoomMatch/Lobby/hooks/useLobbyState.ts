import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  isLoading: boolean;
  errorMessage: string;
  roomIdRef: RefObject<HTMLInputElement>;
  createRoomHandler: () => void;
  createRoomDisabled: boolean;
  enterRoomHandler: () => Promise<void>;
  enterRoomDisabled: boolean;
  backButtonHandler: () => void;
};

export const useLobbyState = (): IResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isProcessingAny, setIsProcessingAny] = useState<boolean>(false);
  const [succeedEnterRoom, setSucceedEnterRoom] = useState<boolean>(false);
  const { room, createRoom, enterRoom } = useRoomSync();
  const navigate = useNavigate();
  const roomIdRef = useRef<HTMLInputElement>(null!);

  const createEnterButtonDisabled = useMemo(() => (
    isProcessingAny || room.isEntered || succeedEnterRoom
  ), [isProcessingAny, room.isEntered]);

  useEffect(() => {
    if (room.isEntered) {
      navigate("/room-match/waiting-room");
    }
  }, [room.isEntered]);

  // ルーム
  const _createRoomHandler = useCallback(async () => {
    setIsLoading(true);
    setIsProcessingAny(true);
    await createRoom()
      .then(() => {
        setSucceedEnterRoom(true);
      })
      .catch(() => {
        navigate("/error");
      });
    setIsProcessingAny(false);
  }, []);

  const _enterRoomHandler = useCallback(async () => {
    const value = roomIdRef.current?.value;

    setIsProcessingAny(true);
    if (typeof value === "string") {
      if (value == "") {
        setErrorMessage("値を入力してください。");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await enterRoom(value).then(() => {
          setSucceedEnterRoom(true);
        }).catch((e) => {
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
    setIsProcessingAny(false);
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
    createRoomDisabled: createEnterButtonDisabled,
    enterRoomHandler: _enterRoomHandler,
    enterRoomDisabled: createEnterButtonDisabled,
    backButtonHandler: _backButtonHandler,
  };
};
