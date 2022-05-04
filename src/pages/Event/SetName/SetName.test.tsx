import React from "react";
import { shallow } from "enzyme";
import { EventSetName } from "./SetName";
import { IResponse, useSetNameState } from "./hooks/useSetNameState";

jest.mock("./hooks/useSetNameState");

const useSetNameStateMock = useSetNameState as jest.Mock;

const initialState: IResponse = {
  nameInputRef: { current: null },
  startBtnHandler: jest.fn(),
};

describe("<EventSelectMode />", () => {
  beforeEach(() => {
    useSetNameStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<EventSetName />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
