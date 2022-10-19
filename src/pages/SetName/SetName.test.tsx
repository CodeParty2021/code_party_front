import React from "react";
import { shallow } from "enzyme";
import { SetName } from "./SetName";
import { IResponse, useSetNameState } from "./hooks/useSetNameState";

jest.mock("./hooks/useSetNameState");

const useSetNameStateMock = useSetNameState as jest.Mock;

const initialState: IResponse = {
  loading: false,
  error: undefined,
  nameInputRef: { current: null },
  startBtnHandler: jest.fn(),
  btnDisabled: true,
  nameInputHandler: jest.fn(),
};

describe("<SetName />", () => {
  beforeEach(() => {
    useSetNameStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<SetName />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
