import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { CreateCodeResponseType, GetCodeResponseType, UpdateCodeResponseType, useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
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
 * APIがエラーだった場合のエラースロー
 */
const errorFunc = () => {
  throw new Error();
};

describe("useCode", () => {
  let hook: RenderHookResult<unknown, IResponse>;
  beforeEach(() => {
    useCodeAPIMock.mockReturnValue({
      error: undefined,
      ...codeAPIMockJestFn
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
      beforeEach(() => {
        hook = renderHook(() => useCode("codeId"));
      });

      test("APIのgetCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.getCode).toHaveBeenCalled();
      });

      test("コードがDBからロードされて更新される", async () => {
        const { codeState } = hook.result.current;
        expect(codeState.code).toEqual(gotCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.result.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    describe("loadCodeを実行した場合", () => {
      beforeEach(() => {
        hook = renderHook(() => useCode());
        const { loadCode } = hook.result.current;
        act(() => {
          loadCode("codeId");
        });
      });

      test("APIのgetCode関数が実行される", async () => {
        expect(codeAPIMockJestFn.getCode).toHaveBeenCalled();
      });

      test("コードがDBからロードされて更新される", async () => {
        const { codeState } = hook.result.current;
        expect(codeState.code).toEqual(gotCode);
      });

      test("状態が更新される", async () => {
        const { codeState } = hook.result.current;
        expect(codeState.isLoading).toBe(false);
        expect(codeState.isSave).toBe(true);
        expect(codeState.isOnline).toBe(true);
        expect(codeState.isExecutable).toBe(true);
      });
    });

    // describe("createCodeを実行した場合", () => {
    //   beforeEach(() => {
    //     hook = renderHook(() => useCode());
    //     const current = hook.result.current;
    //     act(() => {
    //       current.createCode(
    //         "print('create')'",
    //         0,
    //         "python"
    //       );
    //     });
    //   });

    //   test("APIのcreateCode関数が実行される", async () => {
    //     expect(codeAPIMockJestFn.createCode).toHaveBeenCalled();
    //   });

    //   test("コードが作成される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.code).toEqual(createdCode);
    //   });

    //   test("状態が更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.isLoading).toBe(false);
    //     expect(codeState.isSave).toBe(true);
    //     expect(codeState.isOnline).toBe(true);
    //     expect(codeState.isExecutable).toBe(true);
    //   });
    // });

    // describe("createCodeDefaultを実行した場合", () => {
    //   beforeEach(() => {
    //     hook = renderHook(() => useCode());
    //     const current = hook.result.current;
    //     act(() => {
    //       current.createCodeDefault(0, "python");
    //     });
    //   });

    //   test("APIのcreateCode関数が実行される", async () => {
    //     expect(codeAPIMockJestFn.createCode).toHaveBeenCalled();
    //   });

    //   test("コードが作成される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.code).toEqual(createdCode);
    //   });

    //   test("状態が更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.isLoading).toBe(false);
    //     expect(codeState.isSave).toBe(true);
    //     expect(codeState.isOnline).toBe(true);
    //     expect(codeState.isExecutable).toBe(true);
    //   });
    // });

    // describe("updateCodeOnlyFrontを実行した場合", () => {
    //   beforeEach(() => {
    //     // コードは事前にロードしておく
    //     hook = renderHook(() => useCode("codeId"));
    //     const current = hook.result.current;
    //     act(() => {
    //       current.updateCodeOnlyFront("print('updateFrontOnly')");
    //     });
    //   });

    //   test("コードが更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.code).toEqual({
    //       ...gotCode,
    //       codeContent: "print('updateFrontOnly')",
    //     });
    //   });

    //   test("状態が更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.isLoading).toBe(false);
    //     expect(codeState.isSave).toBe(false);
    //     expect(codeState.isOnline).toBe(true);
    //     expect(codeState.isExecutable).toBe(true);
    //   });
    // });

    // describe("saveCodeを実行した場合", () => {
    //   beforeEach(() => {
    //     // コードは事前にロードしておく
    //     hook = renderHook(() => useCode("codeId"));
    //     const current = hook.result.current;
    //     act(() => {
    //       current.saveCode();
    //     });
    //   });

    //   test("APIのupdateCode関数が実行される", async () => {
    //     expect(codeAPIMockJestFn.updateCode).toHaveBeenCalled();
    //   });

    //   test("コードが更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.code).toEqual({
    //       ...gotCode,
    //       ...updatedCode,
    //     });
    //   });

    //   test("状態が更新される", async () => {
    //     const { codeState } = hook.result.current;
    //     expect(codeState.isLoading).toBe(false);
    //     expect(codeState.isSave).toBe(true);
    //     expect(codeState.isOnline).toBe(true);
    //     expect(codeState.isExecutable).toBe(true);
    //   });
    // });
  });

  // describe("APIエラーの場合", () => {
  //   beforeEach(() => {
  //     useCodeAPIMock.mockReturnValue({
  //       error: "error",
  //       ...codeAPIMockJestFn
  //     });
  //     codeAPIMockJestFn.getCode.mockImplementation(errorFunc);
  //     codeAPIMockJestFn.updateCode.mockReturnValue(errorFunc);
  //     codeAPIMockJestFn.createCode.mockReturnValue(errorFunc);
  //   });

  //   describe("codeIdを引数に与えてた場合", () => {
  //     beforeEach(() => {
  //       hook = renderHook(() => useCode("codeId"));
  //     });

  //     test("エラー状態になる", async () => {
  //       const { codeState } = hook.result.current;
  //       expect(codeState.isLoading).toBe(false);
  //       expect(codeState.isSave).toBe(false);
  //       expect(codeState.isOnline).toBe(false);
  //       expect(codeState.isExecutable).toBe(false);
  //     });
  //   });

  //   describe("loadCodeを実行した場合", () => {
  //     beforeEach(() => {
  //       hook = renderHook(() => useCode());
  //       const current = hook.result.current;
  //       act(() => {
  //         current.loadCode("codeId");
  //       });
  //     });

  //     test("エラー状態になる", async () => {
  //       const { codeState } = hook.result.current;
  //       expect(codeState.isLoading).toBe(false);
  //       expect(codeState.isSave).toBe(false);
  //       expect(codeState.isOnline).toBe(false);
  //       expect(codeState.isExecutable).toBe(false);
  //     });
  //   });

  //   describe("createCodeを実行した場合", () => {
  //     beforeEach(() => {
  //       hook = renderHook(() => useCode());
  //       const current = hook.result.current;
  //       act(() => {
  //         current.createCode(
  //           "print('create')'",
  //           0,
  //           "python"
  //         );
  //       });
  //     });

  //     test("エラー状態になる", async () => {
  //       const { codeState } = hook.result.current;
  //       expect(codeState.isLoading).toBe(false);
  //       expect(codeState.isSave).toBe(false);
  //       expect(codeState.isOnline).toBe(false);
  //       expect(codeState.isExecutable).toBe(false);
  //     });
  //   });

  //   describe("createCodeDefaultを実行した場合", () => {
  //     beforeEach(() => {
  //       hook = renderHook(() => useCode());
  //       const current = hook.result.current;
  //       act(() => {
  //         current.createCodeDefault(0, "python");
  //       });
  //     });

  //     test("エラー状態になる", async () => {
  //       const { codeState } = hook.result.current;
  //       expect(codeState.isLoading).toBe(false);
  //       expect(codeState.isSave).toBe(false);
  //       expect(codeState.isOnline).toBe(false);
  //       expect(codeState.isExecutable).toBe(false);
  //     });
  //   });

  //   describe("saveCodeを実行した場合", () => {
  //     beforeEach(() => {
  //       // コードは事前にロードしておく
  //       hook = renderHook(() => useCode("codeId"));
  //       const current = hook.result.current;
  //       act(() => {
  //         current.saveCode();
  //       });
  //     });

  //     test("エラー状態になる", async () => {
  //       const { codeState } = hook.result.current;
  //       expect(codeState.isLoading).toBe(false);
  //       expect(codeState.isSave).toBe(false);
  //       expect(codeState.isOnline).toBe(false);
  //       expect(codeState.isExecutable).toBe(false);
  //     });
  //   });
  // });
});
