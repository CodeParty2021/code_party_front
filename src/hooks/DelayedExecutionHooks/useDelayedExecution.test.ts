import {
  act,
  renderHook,
  RenderResult,
  WaitFor,
} from "@testing-library/react-hooks";
import { useDelayedExecution, IResponse } from "./useDelayedExecution";

const Func1 = jest.fn();
const Func2 = jest.fn();

describe("useDummyLoading", () => {
  let hook: RenderResult<IResponse>;
  let wait: WaitFor;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("引数を指定した場合", () => {
    beforeEach(async () => {
      await act(async () => {
        const { result, waitFor } = renderHook(() => useDelayedExecution(100));
        hook = result;
        wait = waitFor;
      });
    });

    test("状態が正常", async () => {
      const { stacked } = hook.current;
      expect(stacked).toBe(false);
    });

    test("execDelayedを実行すると100ms後に関数が実行される", async () => {
      // 測定開始
      const start = performance.now();
      await act(async () => {
        hook.current.execDelayed(Func1, "test1");
      });

      // 実行中の値が正常
      expect(hook.current.stacked).toBe(true); // 実行中状態
      expect(Func1).toBeCalledTimes(0); // まだ呼ばれていない

      // 実行終了まで待つ
      await wait(() => hook.current.stacked === false);
      const end = performance.now();
      const elapsed = end - start;

      // チェック
      expect(elapsed).toBeGreaterThanOrEqual(100);
      expect(Func1).toBeCalled();
      expect(Func1).toBeCalledWith([["test1"]]);
    });

    test("二回連続で実行すると後の関数だけが呼ばれる", async () => {
      // 一度目の関数実行
      await act(async () => {
        hook.current.execDelayed(Func1, "test1");
      });

      // 実行中の値が正常
      await wait(() => hook.current.stacked === true);

      // 測定開始
      let start = performance.now();
      await act(async () => {
        hook.current.execDelayed(Func2, "test2");
      });

      // 実行終了まで待つ
      await wait(() => hook.current.stacked === false);
      let end = performance.now();
      let elapsed = end - start;

      expect(elapsed).toBeGreaterThanOrEqual(100); // 100ms以上待機した
      expect(Func1).toBeCalledTimes(0); // 最初に実行したFunc1は呼ばれていない
      expect(Func2).toBeCalled(); // Func2は呼ばれている
      expect(Func2).toBeCalledWith([["test2"]]); // 実行時の引数が正しい
    });
  });
});
