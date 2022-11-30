import { useEffect } from "react";

import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useRunCodes } from "hooks/CodeAPIHooks/useRunCodes";

export type IResponse = {};

export const useRunSimulation = (): IResponse => {
  const { room, isHost, updateRoomInfo } = useRoomSync();
  const {
    data: simulationResult,
    error: simulationError,
    runCodes,
  } = useRunCodes();

  //初期処理
  useEffect(() => {
    //シミュレーションの実行(ホストのみ実行)
    if (isHost) {
      const codes: string[] = [];
      room.sortedKeysOfMembers.forEach((key) => {
        const member = room.members[key];
        if (member.codeId) codes.push(member.codeId);
      });
      runCodes(...codes);
    }
  }, []);

  //シミュレーション結果を受信した場合
  useEffect(() => {
    if (simulationResult) {
      updateRoomInfo({
        analyzingResult: {
          resultId: simulationResult.jsonId,
        },
      });
    }
  }, [simulationResult]);

  //シミュレーション中にエラーが発生した場合
  useEffect(() => {
    if (simulationError) {
      updateRoomInfo({
        analyzingResult: {
          error: "シミュレーション実行中にエラーが発生しました。",
        },
      });
    }
  }, [simulationError]);

  return {};
};
