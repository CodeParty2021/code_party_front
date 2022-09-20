import { JSONLog, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { CodeState } from "hooks/CodeHooks/useCode";
import { useCallback, useState } from "react";

export type IResponse = {
  resultState: ResultState;
  /**
   * コードをテスト実行する
   * 結果はresultStateに格納される
   */
  testCode: (codeState: CodeState) => Promise<JSONLog | undefined>;
  /**
   * 状態をリセットする
   */
  reset: () => void;
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
  const { testCode: testCodeOnAPI } = useCodeAPI();

  const _setIsFailed = useCallback((isFailed: boolean) => {
    setResultState((current) => ({
      ...current,
      isFailed,
    }));
  }, []);

  const testCode = useCallback<IResponse["testCode"]>(async (codeState) => {
    const currentCode = codeState.code;
    if (codeState.isExecutable && currentCode) {
      try {
        const { json } = await testCodeOnAPI(currentCode.id);
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
    } else {
      _setIsFailed(true);
      throw new Error("This code is not executable.");
    }
  }, []);

  const reset = useCallback(() => {
    setResultState({ ...initialState });
  }, []);

  return {
    resultState,
    testCode,
    reset,
  };
};
