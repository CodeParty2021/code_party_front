import { renderHook, RenderResult } from "@testing-library/react-hooks";
import { useMonacoEditor, IResponse } from "./useMonacoEditor";

describe("useMonacoEditor", () => {
  let hook: RenderResult<IResponse>;

  beforeEach(() => {
    const { result } = renderHook(() => useMonacoEditor());
    hook = result;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("フックが描画される", () => {
    expect(hook.current).toBeTruthy();
  });

  it.todo("コードを入力すると状態が更新される");

  it.todo("getInputCodeを実行すると入力したコードが取得できる");
});
