import { useCallback, useState } from "react";
import {
  getMemberAsync,
  getRoomAsync,
} from "services/RoomSync/DBOperator/DBOperator";
import { UserState } from "services/RoomSync/RoomSync";

export type IState = {
  data?: UserState;
  error?: Error;
  loading: boolean;
};

export type IResponse = IState & {
  getHost: (roomId: string) => void;
};

export const useFetchHost = (): IResponse => {
  const [res, setRes] = useState<IState>({
    loading: false,
  });

  const getHost = useCallback(
    async (roomId: string) => {
      setRes((prevState) => ({ ...prevState, loading: true }));

      const roomInfo = await getRoomAsync(roomId);
      if (!roomInfo) {
        setRes({
          error: new Error("部屋情報が見つかりませんでした。"),
          loading: false,
        });
        return;
      }
      const memberInfo = await getMemberAsync(roomId, roomInfo.host);
      if (!memberInfo) {
        setRes({
          error: new Error("ホストが見つかりませんでした。"),
          loading: false,
        });
        return;
      }
      setRes({ data: memberInfo, loading: false });
    },
    [setRes]
  );

  return {
    ...res,
    getHost,
  };
};
