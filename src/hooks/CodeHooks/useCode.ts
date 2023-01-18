import { CodeType, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { useCallback, useEffect, useMemo, useState } from "react";

export type IResponse = {
  /**
   * コードの状態
   */
  codeState: CodeState;
  /**
   * ファクトリメソッド
   * codeIdからコードを読み込む
   */
  loadCode: (codeId: string) => Promise<void>;
  /**
   * ファクトリメソッド
   * コードを新規に作成する
   * 作成失敗時はエラーがスローされる
   */
  createCode: (
    codeContent: string,
    stepId: number,
    language: string
  ) => Promise<string>;
  /**
   * ファクトリメソッド
   * デフォルトのコードを使用してコードを生成する
   * 作成失敗時はエラーがスローされる
   */
  createCodeDefault: (stepId: number, language: string) => Promise<string>;
  /**
   * フロントのみでコード内容を更新する
   */
  updateCodeOnlyFront: (codeContent: string) => void;
  /**
   * ステップを変更する
   */
  changeStep: (step:number)=> Promise<void>;
  /**
   * コードを保存する
   */
  saveCode: () => Promise<void>;
  
};

export type CodeState = {
  /**
   * コードの内容
   */
  code?: CodeType;
  /**
   * コードをローディング中かどうか
   */
  isLoading: boolean;
  /**
   * コードが保存されているかどうか
   */
  isSave: boolean;
  /**
   * DB上のリソースと紐づけられているかどうか
   */
  isOnline: boolean;
  /**
   * 実行可能な状態にあるか
   * （コードがDB上にない、または構文エラーが含まれている場合はfalse）
   */
  isExecutable: boolean;
};

type PrivateState = Pick<
  CodeState,
  "code" | "isLoading" | "isSave" | "isOnline"
>;

const initialState: PrivateState = {
  code: undefined,
  isLoading: true,
  isSave: false,
  isOnline: false,
};

/**
 * コードを扱うフック
 * @param codeId コードID
 */
export const useCode = (codeId?: string): IResponse => {
  const [codeState, setCodeState] = useState<PrivateState>({ ...initialState });
  const {
    error: errorCodeAPI,
    getCode: getCodeOnAPI,
    updateCode: updateCodeOnAPI,
    createCode: createCodeOnAPI,
  } = useCodeAPI();

  // ゲッター
  const isExecutable = useMemo(
    () => codeState.isOnline && !errorCodeAPI,
    [codeState.isOnline, errorCodeAPI]
  );

  // セッター
  const _setCode = useCallback((code: CodeType) => {
    setCodeState((current) => ({ ...current, code: code }));
    _setIsSave(false);
  }, []);

  const _setIsLoading = useCallback((isLoading: boolean) => {
    setCodeState((current) => ({ ...current, isLoading }));
  }, []);

  const _setIsSave = useCallback((isSave: boolean) => {
    setCodeState((current) => ({ ...current, isSave }));
  }, []);

  const _setIsOnline = useCallback((isOnline: boolean) => {
    setCodeState((current) => ({
      ...current,
      isOnline,
    }));
  }, []);

  const _updateStateWhenLoaded = useCallback(() => {
    _setIsLoading(false);
    _setIsOnline(true);
    _setIsSave(true);
  }, []);

  const _updateStateWhenError = useCallback(() => {
    _setIsLoading(false);
  }, []);

  // publicメソッド
  const loadCode: IResponse["loadCode"] = useCallback(async (codeId) => {
    _setIsLoading(true);
    try {
      const code = await getCodeOnAPI(codeId);
      _setCode(code);
      _updateStateWhenLoaded();
    } catch {
      _updateStateWhenError();
    }
  }, []);

  const createCode: IResponse["createCode"] = useCallback(
    async (codeContent, stepId, language) => {
      _setIsLoading(true);
      try {
        const code = await createCodeOnAPI(codeContent, stepId, language);
        _setCode(code);
        _updateStateWhenLoaded();
        return code.id;
      } catch (error) {
        _updateStateWhenError();
        throw error;
      }
    },
    []
  );

  const createCodeDefault: IResponse["createCodeDefault"] = useCallback(
    async (stepId, language) => {
      const codeId = await createCode(
        "def select(field,my_pos,other_pos):\n  return 0",
        stepId,
        language
      );
      return codeId;
    },
    []
  );

  const updateCodeOnlyFront: IResponse["updateCodeOnlyFront"] = useCallback(
    (codeContent) => {
      if (codeState.code) {
        _setCode({ ...codeState.code, codeContent });
      }
    },
    [codeState.code]
  );

  const saveCode: IResponse["saveCode"] = useCallback(async () => {
    const currentCode = codeState.code;
    if (!codeState.isSave && codeState.isOnline && currentCode) {
      try {
        await updateCodeOnAPI(
          currentCode.id,
          currentCode.codeContent,
          currentCode.step,
          currentCode.language
        );
        _setIsSave(true);
      } catch {
        _updateStateWhenError();
      }
    }
  }, [codeState.isSave, codeState.code]);

  const changeStep: IResponse["changeStep"] = async (step:number) => {
    const currentCode = codeState.code;
    if ( /*!codeState.isSave &&*/ codeState.isOnline && currentCode) { 
      try {
        await updateCodeOnAPI(
          currentCode.id,
          currentCode.codeContent,
          step,
          currentCode.language
        );
        _setIsSave(true);
      } catch {
        _updateStateWhenError();
      }
    }
  };

  // コンストラクタ
  useEffect(() => {
    if (codeId) {
      loadCode(codeId).catch(() => {});
    }
  }, [codeId]);

  return {
    codeState: useMemo(
      () => ({
        ...codeState,
        isExecutable,
      }),
      [codeState, isExecutable]
    ),
    loadCode,
    createCode,
    createCodeDefault,
    updateCodeOnlyFront,
    saveCode,
    changeStep
  };
};
