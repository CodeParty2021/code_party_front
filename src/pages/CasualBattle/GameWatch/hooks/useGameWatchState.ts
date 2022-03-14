import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";

export type IResponse = {
  isAnalysing: boolean;
  exitBtnHandler: () => void;
};

export const useGameWatchState = (): IResponse => {
  const { room, updateMember } = useRoomSync();
  const navigate = useNavigate();

  //初期処理
  useEffect(() => {
    //ユーザ状態を更新
    updateMember({
      status: "watching",
    });
    //シミュレーションの実行
  }, []);

  useEffect(() => {
    if(room.info?.analyzingResult) {
      console.log("解析終了！");
    }
  }, [room.info?.analyzingResult]);

  const _exitBtnHandler = () => {
    navigate("/casual-battle/waiting-room");
  };

  return {
    isAnalysing: room.info?.analyzingResult == undefined,
    exitBtnHandler: _exitBtnHandler,
  };
};
