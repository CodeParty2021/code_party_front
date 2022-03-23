import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import {
  ResultType,
  useFetchResult,
} from "hooks/ResultAPIHooks/useFetchResult";
import { useFetchJson } from "hooks/ResultAPIHooks/useFetchJson";

export type IResponse = {
  isAnalyzing: boolean;
  analyzingError: boolean;
  result?: ResultType;
  json?: string;
  exitBtnHandler: () => void;
};

export const useGameWatchState = (): IResponse => {
  const { room, updateMember } = useRoomSync();
  const { data: result, fetchResult } = useFetchResult();
  const { data: json, fetchJson } = useFetchJson();
  const navigate = useNavigate();

  //初期処理
  useEffect(() => {
    //ユーザ状態を更新
    updateMember({
      status: "watching",
    });
  }, []);

  // 何らかの理由でルームから出された場合はロビーに戻る
  useEffect(() => {
    if (!room.isEntered) {
      navigate("/casual-battle");
    }
  }, [room.isEntered]);

  //シミュレーション結果が更新されたら結果をフェッチする
  useEffect(() => {
    if (room.info?.analyzingResult?.resultId) {
      fetchResult(room.info?.analyzingResult.resultId);
      fetchJson(room.info?.analyzingResult.resultId);
    }
  }, [room.info?.analyzingResult]);

  const _exitBtnHandler = () => {
    navigate("/casual-battle/waiting-room");
  };

  return {
    isAnalyzing: !room.info?.analyzingResult?.resultId,
    analyzingError: Boolean(room.info?.analyzingResult?.error),
    result: result,
    json: json,
    exitBtnHandler: _exitBtnHandler,
  };
};
