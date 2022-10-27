import { renderHook, RenderResult } from "@testing-library/react-hooks";
import { useUnityGame, IResponse } from "./useUnityGame";

describe("useResult", () => {
  let hook: RenderResult<IResponse>;

  beforeEach(() => {
    const { result } = renderHook(() => useUnityGame("SquarePaint"));
    hook = result;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("フックが描画される", () => {
    expect(hook.current).toBeTruthy();
  });

  it.todo("Unityロード時に状態が更新される");

  it.todo("Unityゲーム終了時に状態が更新される");

  it.todo("startGameを実行するとゲームが開始する");
});
