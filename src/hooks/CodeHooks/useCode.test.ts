import {
  act,
  renderHook,
  RenderResult,
  WaitFor,
} from "@testing-library/react-hooks";
import {
  CreateCodeResponseType,
  GetCodeResponseType,
  UpdateCodeResponseType,
  useCodeAPI,
} from "hooks/CodeAPIHooks/useCodeAPI";
import { IResponse, useCode } from "./useCode";

jest.mock("hooks/CodeAPIHooks/useCodeAPI");

const useCodeAPIMock = useCodeAPI as jest.Mock;

const codeAPIMockJestFn = {
  getCode: jest.fn(),
  updateCode: jest.fn(),
  createCode: jest.fn(),
};

/**
 * APIでGETした際に得られるテストデータ
 */
const gotCode: GetCodeResponseType = {
  id: "codeId",
  codeContent: "print('hello')",
  language: "python",
  updatedAt: "2022-01-01 00:00:00",
  createdAt: "2022-01-01 00:00:00",
  user: "userId",
  step: 0,
};

/**
 * APIでUPDATEした際に得られるテストデータ
 */
const updatedCode: UpdateCodeResponseType = {
  codeContent: "print('update')",
  language: "python",
  step: "0",
};

/**
 * APIでCREATEした際に得られるテストデータ
 */
const createdCode: CreateCodeResponseType = {
  id: "codeId",
  codeContent: "print('create')",
  language: "python",
  updatedAt: "2022-01-01 00:00:00",
  createdAt: "2022-01-01 00:00:00",
  user: "userId",
  step: 0,
};

/**
 * エラーをスローするテスト関数
 */
const throwError = () => {
  throw new Error("test error");
};

describe("useCode", () => {
  let hook: RenderResult<IResponse>;
  beforeEach(() => {
    useCodeAPIMock.mockReturnValue({
      error: undefined,
      ...codeAPIMockJestFn,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("APIが正常な場合", () => {
    beforeEach(() => {
      codeAPIMockJestFn.getCode.mockReturnValue(gotCode);
      codeAPIMockJestFn.updateCode.mockReturnValue(updatedCode);
      codeAPIMockJestFn.createCode.mockReturnValue(createdCode);
    });

    describe("codeIdを引数に与えた場合", () => {
      beforeEach(async () => {
        await act(async () => {
          const { result } = renderHook(() => useCode("codeId"));
          hook = result;
        });
      });

      test("APIのgetCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.getCode).toHaveBeenCalled();
      });

      test("コードがDBからロードされて更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual(gotCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("loadCodeを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current.loadCode("codeId");
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("APIのgetCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.getCode).toHaveBeenCalled();
      });

      test("コードがDBからロードされて更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual(gotCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("createCodeを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current.createCode("print('create')'", 0, "python");
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("APIのcreateCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.createCode).toHaveBeenCalled();
      });

      test("コードが作成される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual(createdCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("createCodeDefaultを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current.createCodeDefault(0, "python");
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("APIのcreateCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.createCode).toHaveBeenCalled();
      });

      test("コードが作成される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual(createdCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("updateCodeOnlyFrontを実行した場合", () => {
      beforeEach(async () => {
        let wait: WaitFor;
        await act(async () => {
          const { result, waitFor } = renderHook(() => useCode("codeId"));
          hook = result;
          wait = waitFor;
        });
        await act(async () => {
          hook.current.updateCodeOnlyFront("print('updateFrontOnly')");
          await wait(() => hook.current.codeState.isLoading === false);
        });
      });

      test("コードが更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual({
          ...gotCode,
          codeContent: "print('updateFrontOnly')",
        });
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("saveCodeを実行した場合", () => {
      beforeEach(async () => {
        let wait: WaitFor;
        await act(async () => {
          const { result, waitFor } = renderHook(() => useCode("codeId"));
          hook = result;
          wait = waitFor;
        });
        await act(async () => {
          // 変更点がある場合だけsaveが実行される
          hook.current.updateCodeOnlyFront("print('update')");
        });
        await act(async () => {
          await hook.current.saveCode();
          await wait(() => hook.current.codeState.isLoading === false);
        });
      });

      test("APIのupdateCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.updateCode).toHaveBeenCalled();
      });

      test("コードが更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.code).toEqual({
          ...gotCode,
          ...updatedCode,
          step: 0,
        });
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });
  });

  describe("APIエラーの場合", () => {
    beforeEach(() => {
      useCodeAPIMock.mockReturnValue({
        error: "error",
        ...codeAPIMockJestFn,
      });
      codeAPIMockJestFn.getCode.mockImplementation(throwError);
      codeAPIMockJestFn.updateCode.mockImplementation(throwError);
      codeAPIMockJestFn.createCode.mockImplementation(throwError);
    });

    describe("codeIdを引数に与えてた場合", () => {
      beforeEach(async () => {
        await act(async () => {
          hook = renderHook(() => useCode("codeId")).result;
        });
      });

      test("エラー状態になる", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(false);
        expect(codeState.isExecutable).toBe(false);
      });
    });

    describe("loadCodeを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current.loadCode("codeId");
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("エラー状態になる", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(false);
        expect(codeState.isExecutable).toBe(false);
      });
    });

    describe("createCodeを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current
            .createCode("print('create')'", 0, "python")
            .catch(() => {});
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("エラー状態になる", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(false);
        expect(codeState.isExecutable).toBe(false);
      });
    });

    describe("createCodeDefaultを実行した場合", () => {
      beforeEach(async () => {
        const { result, waitFor } = renderHook(() => useCode());
        hook = result;
        await act(async () => {
          await hook.current.createCodeDefault(0, "python").catch(() => {});
          await waitFor(() => hook.current.codeState.isLoading === false);
        });
      });

      test("エラー状態になる", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(false);
        expect(codeState.isExecutable).toBe(false);
      });
    });

    describe("saveCodeを実行した場合", () => {
      beforeEach(async () => {
        let wait: WaitFor;
        await act(async () => {
          const { result, waitFor } = renderHook(() => useCode("codeId"));
          hook = result;
          wait = waitFor;
        });
        await act(async () => {
          hook.current.saveCode();
          await wait(() => hook.current.codeState.isLoading === false);
        });
      });

      test("エラー状態になる", async () => {
        const { codeState } = hook.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(false);
        expect(codeState.isOnline).toBe(false);
        expect(codeState.isExecutable).toBe(false);
      });
    });
  });
});
