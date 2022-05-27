import React from "react";
import { shallow } from "enzyme";
import { CodeCoding } from "./Coding";
import { IResponse, useCodingState } from "./hooks/useCodeHooks";
import { UnityContext } from "react-unity-webgl";

jest.mock("react-redux");
jest.mock("./hooks/useCodeHooks");
jest.mock("react-router-dom");

const useCodeHooksMock = useCodingState as jest.Mock;

const initialState: IResponse = {
  code: {
    id: "sample-id",
    codeContent: "print(aa);",
    language: "1",
    updatedAt: "2012312-1312-1",
    createdAt: "2032121-3123-1",
    user: "teruto",
    step: "1",
  },
  error: undefined,
  loading: false,
  isCode: () => true,
  execCode: jest.fn(),
  turnLog: [
    {
      players: [{ print: "aaa" }, { print: "bbb" }],
    },
    {
      players: [{ print: "aaa" }, { print: "bbb" }],
    },
  ],
  handleEditorDidMount: jest.fn(),
  closeEditorButtonHandler: jest.fn(),
  unityContext: new UnityContext({
    loaderUrl: "unity/sp/web.loader.js",
    dataUrl: "unity/sp/web.data.unityweb",
    frameworkUrl: "unity/sp/web.framework.js.unityweb",
    codeUrl: "unity/sp/web.wasm.unityweb",
  }),
  showUnity: true,
  toggleLogHandler: jest.fn(),
  showLog: false,
  showError: false,
};

describe("<CodeCoding />", () => {
  beforeEach(() => {
    useCodeHooksMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeCoding />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
