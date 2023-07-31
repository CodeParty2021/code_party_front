import React from "react";
import { IResponse, useStartEmailState } from "./hooks/useStartEmailState";
import { shallow } from "enzyme";
import { StartEmailFirstTime } from "./StartEmailFirstTime";

jest.mock("./hooks/useStartEmailState");

const useStartStateMock = useStartEmailState as jest.Mock;

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
  enterSubmitHandler: jest.fn(),
};

describe("<StartEmailFirstTime />", () => {
  beforeEach(() => {
    useStartStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("auth snapshot test", () => {
    const wrapper = shallow(<StartEmailFirstTime />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
