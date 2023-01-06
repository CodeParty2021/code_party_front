import React from "react";
import { IResponse, useStartState } from "./hooks/useStartEmailState";
import { shallow } from "enzyme";
import { StartEmail } from "./StartEmail";

jest.mock("./hooks/useStartEmailState");

const useStartStateMock = useStartState as jest.Mock;

const initialState: IResponse = {
  loading: false,
  algoMessage: "ログインしてください",
  emailRef: { current: null },
  passwordRef: { current: null },
  emailChangeHandler: jest.fn(),
  passwordChangeHandler: jest.fn(),
  startBtnHandler: jest.fn(),
  btnDisabled: false,
  backLinkButtonHandler: jest.fn(),
};

describe("<StartEmailFirstTime />", () => {
  beforeEach(() => {
    useStartStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("auth snapshot test", () => {
    const wrapper = shallow(<StartEmail />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
