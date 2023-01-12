import { useFirebaseAuth } from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/FirebaseAuthHooks/useFirebaseAuthHooks");

const useNavigateMock = useNavigate as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const useFirebaseAuthMock = useFirebaseAuth as jest.Mock;

// mock of useRef
jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

// define mock methods
const singInOfFirebaseMock = jest.fn();
const navigateMock = jest.fn();

const createUserWithEmailMock = jest.fn();

describe("useStartState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
    useDispatchMock.mockReturnValue(jest.fn());
    useFirebaseAuthMock.mockReturnValue({
      signInOfFirebase: singInOfFirebaseMock,
      createUserWithEmail: createUserWithEmailMock,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("startBtnHandler 正常系", async () => {
    // TODO テスト
    // const emailRef = { current: { value: "email@email.com" } };
    // const passRef = { current: { value: "password" } };
    // const { result } = renderHook(() => useStartEmailState());
    // singInOfFirebaseMock.mockReturnValue(Promise.resolve());
    // createUserWithEmailMock.mockReturnValue(result);
    // const { startBtnHandler } = result.current;
    // act(() => {
    //   startBtnHandler();
    // });
    // expect(result.current.loading).toBe(true);
    // expect(result.current.algoMessage).toBe("ログイン方法を選んでね");
  });

  test("backLinkButtonHandler 正常系", async () => {
    // TODO テスト
    // const { result } = renderHook(() => useStartEmailState());
    // const { backLinkButtonHandler } = result.current;
    // act(() => {
    //   backLinkButtonHandler();
    // });
    // expect(navigateMock).toBeCalledTimes(1);
    // expect(navigateMock).lastCalledWith("/", { replace: true });
  });
});
