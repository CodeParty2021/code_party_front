import React from "react";
import { shallow } from "enzyme";
import { EventTop } from "./Top";
import { IResponse, useTopState } from "./hooks/useTopState";

jest.mock("./hooks/useTopState");

const useTopStateMock = useTopState as jest.Mock;

const initialState: IResponse = {
  anonymousLoginBtnDisabled: false,
  anonymousLoginBtnHandler: jest.fn(),
};

describe("<EventSelectMode />", () => {
  beforeEach(() => {
    useTopStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<EventTop />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
