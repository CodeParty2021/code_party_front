import {
  act,
  renderHook,
  RenderResult,
  WaitFor,
} from "@testing-library/react-hooks";
import { useDummyLoading, IResponse } from "./useDummyLoading";

describe("useCode", () => {
  let hook: RenderResult<IResponse>;
  let wait: WaitFor;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("引数を指定した場合", () => {
    beforeEach(async () => {
      await act(async () => {
        const { result, waitFor } = renderHook(() => useDummyLoading(100));
        hook = result;
        wait = waitFor;
      });
    });

    test("状態が正常", async () => {
      const { dummyLoadingState } = hook.current;
      expect(dummyLoadingState.loadTime).toBe(100);
      expect(dummyLoadingState.isLoading).toBe(true);
    });

    test("startDummyLoadを実行すると100ms後にisLoadingがfalseになる", async () => {
      const start = performance.now();
      await act(async () => {
        hook.current.startDummyLoad();
      });
      await wait(() => hook.current.dummyLoadingState.isLoading === false);
      const end = performance.now();

      const elapsed = end - start;

      expect(elapsed).toBeGreaterThanOrEqual(100);
    });

    test("二回実行しても正常に動作する", async () => {
      let start = performance.now();
      await act(async () => {
        hook.current.startDummyLoad();
      });
      await wait(() => hook.current.dummyLoadingState.isLoading === false);
      let end = performance.now();

      let elapsed = end - start;
      expect(elapsed).toBeGreaterThanOrEqual(100);

      start = performance.now();
      await act(async () => {
        hook.current.startDummyLoad();
      });
      await wait(() => hook.current.dummyLoadingState.isLoading === false);
      end = performance.now();

      elapsed = end - start;
      expect(elapsed).toBeGreaterThanOrEqual(100);
    });
  });
});
