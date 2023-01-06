import React from "react";
import { shallow } from "enzyme";
import { Top } from "./Top";
import { IResponse, useTopState } from "./hooks/useTopState";

jest.mock("./hooks/useTopState");

const useTopStateMock = useTopState as jest.Mock;

const initialState: IResponse = {
  FirstLoginBtnDisabled: false,
  FirstLoginBtnHandler: () => {},
  NormalLoginBtnDisabled: false,
  NormalLoginBtnHandler: () => {},
  CreateUserBtnDisabled: false,
  CreateUserBtnHandler: () => {},
};

describe("<Top />", () => {
  beforeEach(() => {
    useTopStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<Top />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
