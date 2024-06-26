import { useCallback, useEffect, useState } from "react";

export type IResponse = {
  /**
   * コードの状態
   */
  dummyLoadingState: DummyLoadingState;
  /**
   * ロードを開始する
   */
  startDummyLoad: () => Promise<void>;
};

export type DummyLoadingState = {
  /**
   * ロード時間
   */
  loadTime: number;
  /**
   * ダミーローディング中かどうか
   */
  isLoading: boolean;
};

const initialState: DummyLoadingState = {
  loadTime: 1000,
  isLoading: true,
};

/**
 * ダミーロードを行うフック
 */
export const useDummyLoading = (loadTime: number): IResponse => {
  const [dummyLoadingState, setDummyLoadingState] = useState<DummyLoadingState>(
    { ...initialState }
  );
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  const _setIsLoading = useCallback((isLoading: boolean) => {
    setDummyLoadingState((current) => ({
      ...current,
      isLoading,
    }));
  }, []);

  const _setTime = useCallback((loadTime) => {
    if (loadTime < 0) return;
    setDummyLoadingState((current) => ({
      ...current,
      loadTime,
    }));
  }, []);

  const startDummyLoad = useCallback<IResponse["startDummyLoad"]>(async () => {
    // 二回以降は前回のタイマーをキャンセルして実行
    if (dummyLoadingState.isLoading && timeoutId) {
      window.clearTimeout(timeoutId);
    }

    // ダミーローディング開始
    _setIsLoading(true);
    const nextTimeoutId = window.setTimeout(() => {
      _setIsLoading(false);
    }, dummyLoadingState.loadTime);

    setTimeoutId(nextTimeoutId);
  }, [dummyLoadingState.loadTime, timeoutId]);

  // コンストラクタ
  useEffect(() => {
    if (loadTime) {
      _setTime(loadTime);
    } else {
      throw new Error("loadTimeを指定してください");
    }
  }, [loadTime]);

  return {
    dummyLoadingState,
    startDummyLoad,
  };
};
