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
  state: {
    showTurnLog: false,
    switchDisplay: "editor",
    messageType: "loading",
    buttonType: "toGame",
    showSetting: false,
  },
  code: {
    id: "sample-id",
    codeContent: "print(aa);",
    language: "1",
    updatedAt: "2012312-1312-1",
    createdAt: "2032121-3123-1",
    user: "teruto",
    step: 1,
  },
  loading: false,
  buttonHandler: jest.fn(),
  showMessage: false,
  // execCode: jest.fn(),
  // unityLoad: false,
  turnLog: [
    {
      players: [{ print: "aaa" }, { print: "bbb" }],
    },
    {
      players: [{ print: "aaa" }, { print: "bbb" }],
    },
  ],
  handleEditorDidMount: jest.fn(),
  // closeEditorButtonHandler: jest.fn(),
  unityContext: new UnityContext({
    loaderUrl: "unity/sp/web.loader.js",
    dataUrl: "unity/sp/web.data.unityweb",
    frameworkUrl: "unity/sp/web.framework.js.unityweb",
    codeUrl: "unity/sp/web.wasm.unityweb",
  }),
  showUnity: true,
  toggleLogHandler: jest.fn(),
  showLog: false,
  // showError: false,
  // description: {
  //   id: "1fawe23df",
  //   createdAt: `2020-09-21T12:38:15.655Z`,
  //   updatedAt: `2020-09-21T12:38:15.655Z`,
  //   publishedAt: `2020-09-21T12:38:15.655Z`,
  //   revisedAt: `2020-09-21T12:38:15.655Z`,
  //   worldIndex: 1,
  //   stageIndex: 0,
  //   stepIndex: 0,
  //   body: [
  //     {
  //       fieldId: "body",
  //       html: '<h1 id="hc9f08a00f8">ステージ１</h1><p>次の画像のように動こう<br>&lt;table&gt;<br>&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;<br>&lt;/table&gt;<br><img src="https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png" alt=""></p>',
  //     },
  //     {
  //       fieldId: "hintBox",
  //       title: "ヒント、関数とは",
  //       body: '<h1 id="hb3ab3aee6b">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>',
  //     },
  //   ],
  // },
  backLinkState: { label: "", route: "" },
  showSetting: false,
  toggleSettingHandler: jest.fn(),
  closePanelHandler: jest.fn(),
  panelState: "log",
  changeStep: jest.fn(),
  error: undefined,
  linkToNotion: jest.fn(),
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
