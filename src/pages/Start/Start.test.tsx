import React from "react";
import { IResponse, useStartState } from "./hooks/useStartState";
import { shallow } from "enzyme";
import { Start } from "./Start";

jest.mock("./hooks/useStartState");

const useStartStateMock = useStartState as jest.Mock;

const initialState: IResponse = {
  loading: false,
  algoMessage: "ログインしてください",
  signInButtonsHandler: jest.fn(),
  backLinkButtonHandler: jest.fn(),
};

describe("<Start />", () => {
  beforeEach(() => {
    useStartStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("auth snapshot test", () => {
    const wrapper = shallow(<Start />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
