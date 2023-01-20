import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useFetchJson } from "hooks/ResultAPIHooks/useFetchJson";
import { useUnityGame } from "hooks/UnityGameHooks/useUnityGame";
import { UnityContext } from "react-unity-webgl";
import { useDummyLoading } from "hooks/DummyLoadingHooks/useDummyLoading";

export type IResponse = {
  unityContext: UnityContext;
  state: "Analyzing" | "Running" | "Finish" | "AnalyzingError";
  messageType: "Analyzing" | "AnalyzingError";
  exitBtnHandler: () => void;
};

export const useGameWatchState = (): IResponse => {
  const { room, updateMember } = useRoomSync();
  const { data: json, fetchJson } = useFetchJson();
  const { unityContext, startGame, unityStatus } = useUnityGame("SquarePaint");
  const [messageType, setMessageType] =
    useState<IResponse["messageType"]>("Analyzing");
  const { dummyLoadingState, startDummyLoad } = useDummyLoading(1000);
  const navigate = useNavigate();

  const state = room.info?.analyzingResult?.error
    ? "AnalyzingError"
    : !room.info?.analyzingResult?.resultId ||
      unityStatus.isLoading ||
      dummyLoadingState.isLoading
    ? "Analyzing"
    : unityStatus.isRunning
    ? "Running"
    : "Finish";

  // メッセージの操作
  useEffect(() => {
    if (state === "Analyzing") setMessageType("Analyzing");
    else if (state === "AnalyzingError") setMessageType("AnalyzingError");
  }, [state]);

  //初期処理
  useEffect(() => {
    //ユーザ状態を更新
    updateMember({
      status: "watching",
    });

    // ダミーロード開始
    startDummyLoad();
  }, []);

  // 何らかの理由でルームから出された場合はロビーに戻る
  useEffect(() => {
    if (!room.isEntered) {
      navigate("/room-match");
    }
  }, [room.isEntered]);

  //シミュレーション結果が更新されたら結果をフェッチする
  useEffect(() => {
    if (room.info?.analyzingResult?.resultId) {
      fetchJson(room.info?.analyzingResult.resultId);
    }
  }, [room.info?.analyzingResult]);

  // 観戦開始
  useEffect(() => {
    if (!unityStatus.isLoading && json) {
      startGame(json);
    }
  }, [unityStatus.isLoading, json]);

  const _exitBtnHandler = () => {
    navigate("/room-match/waiting-room");
  };

  return {
    state,
    messageType,
    unityContext,
    exitBtnHandler: _exitBtnHandler,
  };
};
