import { JSONLog, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { useCallback, useState } from "react";

export type IResponse = {
  resultState: ResultState;
  /**
   * コードをテスト実行する
   * 結果はresultStateに格納される
   */
  testCode: (codeState: string) => Promise<JSONLog | undefined>;
  /**
   * 状態をリセットする
   */
  reset: () => void;
  error: string | undefined;
};

export type ResultState = {
  /**
   * シミュレーション結果のJSON
   */
  simulationJson?: JSONLog;
  /**
   * シミュレーションが失敗したかどうか
   */
  isFailed: boolean;
};

const initialState: ResultState = {
  simulationJson: undefined,
  isFailed: false,
};

/**
 * シミュレーション結果を扱うフック
 */
export const useResult = (): IResponse => {
  const [resultState, setResultState] = useState<ResultState>({
    ...initialState,
  });
  const { testCode: testCodeOnAPI, error } = useCodeAPI();

  const _setIsFailed = useCallback((isFailed: boolean) => {
    setResultState((current) => ({
      ...current,
      isFailed,
    }));
  }, []);

  const testCode = useCallback<IResponse["testCode"]>(async (codeId) => {
    try {
      const { json } = await testCodeOnAPI(codeId);
      setResultState((current) => ({
        ...current,
        simulationJson: json,
      }));
      _setIsFailed(false);
      return json;
    } catch (error) {
      _setIsFailed(true);
      return undefined;
    }
  }, []);

  const reset = useCallback(() => {
    setResultState({ ...initialState });
  }, []);

  return {
    resultState,
    testCode,
    reset,
    error,
  };
};
