import React from "react";
import { shallow } from "enzyme";
import { EventSelectMode } from "./SelectMode";
import { IResponse, useSelectModeState } from "./hooks/useSelectModeState";

jest.mock("./hooks/useSelectModeState");

const useSelectModeStateMock = useSelectModeState as jest.Mock;

const initialState: IResponse = {
  loading: false,
  error: undefined,
  beginTrainHandler: () => {},
  beginBattleHandler: () => {},
};

describe("<EventSelectMode />", () => {
  beforeEach(() => {
    useSelectModeStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<EventSelectMode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
