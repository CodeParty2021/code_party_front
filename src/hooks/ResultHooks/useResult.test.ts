import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import {
  TestCodeResponseType,
  useCodeAPI,
} from "hooks/CodeAPIHooks/useCodeAPI";
import { useResult, IResponse } from "./useResult";

jest.mock("hooks/CodeAPIHooks/useCodeAPI");

const useCodeAPIMock = useCodeAPI as jest.Mock;

const apiMockFuncs = {
  testCode: jest.fn(),
};

const codeId = "0";

const testSimulationJson: TestCodeResponseType = {
  json: {
    turn: [],
  },
  unityURL: "",
};

const errorFunc = () => {
  throw new Error();
};

describe("useResult", () => {
  let hook: RenderResult<IResponse>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("APIが正常な場合", () => {
    beforeEach(async () => {
      useCodeAPIMock.mockReturnValue({
        ...apiMockFuncs,
      });
      apiMockFuncs.testCode.mockReturnValue({
        ...testSimulationJson,
      });

      await act(async () => {
        const { result } = renderHook(() => useResult());
        hook = result;
      });
    });

    test("初期値が正常", async () => {
      const { resultState } = hook.current;
      expect(resultState.simulationJson).toBeUndefined();
      expect(resultState.isFailed).toBeFalsy();
    });

    test("testCodeを実行すると値が正常に更新される", async () => {
      await act(async () => {
        await hook.current.testCode(codeId);
      });

      const { resultState } = hook.current;
      expect(resultState.simulationJson).toEqual(testSimulationJson.json);
      expect(resultState.isFailed).toBeFalsy();
    });

    test("resetを実行すると状態がリセットされる", async () => {
      // シミュレーションを実行して状態を変更
      await act(async () => {
        await hook.current.testCode(codeId);
      });

      await act(async () => {
        hook.current.reset();
      });

      const { resultState } = hook.current;
      expect(resultState.simulationJson).toBeUndefined();
      expect(resultState.isFailed).toBeFalsy();
    });
  });

  describe("APIがエラーを返す場合", () => {
    beforeEach(async () => {
      useCodeAPIMock.mockReturnValue({
        ...apiMockFuncs,
      });
      apiMockFuncs.testCode.mockImplementation(errorFunc);

      await act(async () => {
        const { result } = renderHook(() => useResult());
        hook = result;
      });
    });

    test("testCodeを実行すると失敗した状態になる", async () => {
      await act(async () => {
        hook.current.testCode(codeId);
      });

      const { resultState } = hook.current;
      expect(resultState.isFailed).toBeTruthy();
    });
  });
});
