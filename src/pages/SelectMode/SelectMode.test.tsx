import React from "react";
import { shallow } from "enzyme";
import { SelectMode } from "./SelectMode";
import { IResponse, useSelectModeState } from "./hooks/useSelectModeState";

jest.mock("./hooks/useSelectModeState");

const useModeSelectStateMock = useSelectModeState as jest.Mock;

const initialState: IResponse = {
  beginDevelopHandler: () => {},
  beginRoomMatchHandler: () => {},
};

describe("<ModeSelect />", () => {
  beforeEach(() => {
    useModeSelectStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<SelectMode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
