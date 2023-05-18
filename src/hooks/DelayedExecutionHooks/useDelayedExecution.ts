import { useCallback, useState } from "react";

export type IResponse = {
  /** 関数が実行中かどうか */
  stacked: boolean;
  /** 指定した時間遅らせて関数を実行する */
  execDelayed: (
    delayedFunc: (...params: any[]) => void,
    ...params: any[]
  ) => Promise<void>;
};

/**
 * delayedTimeに指定した時間、関数を遅らせて実行する
 * 連続で
 * @param delayedTime 遅らせる時間
 */
export const useDelayedExecution = (delayedTime: number): IResponse => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [stacked, setstacked] = useState<boolean>(false);

  const execDelayed = useCallback(
    (delayedFunc, ...params) => {
      return new Promise<void>((resolve) => {
        if (timeoutId) window.clearTimeout(timeoutId);
        setstacked(true);
        const newTiemoutId = window.setTimeout(
          (...params: any[]) => {
            delayedFunc(params);
            setstacked(false);
            resolve();
          },
          delayedTime,
          params
        );
        setTimeoutId(newTiemoutId);
      });
    },
    [delayedTime, timeoutId]
  );

  return {
    stacked,
    execDelayed,
  };
};
