import React from "react";
import { shallow } from "enzyme";

import { CasualBattleLobby } from "./Lobby";
import { IResponse, useLobbyState } from "./hooks/useLobbyState";

jest.mock("./hooks/useLobbyState");

const useSelectorMock = useLobbyState as jest.Mock;

const state: IResponse = {
  roomCreateBtnDisabled: false,
  roomCreateBtnHandler: jest.fn(),
  roomSearchBtnHandler: jest.fn(),
};

describe("<CasualBattleLobby />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattleLobby />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("room create button test", () => {
    const wrapper = shallow(<CasualBattleLobby />);

    const btn = wrapper.find("#create-btn");
    btn.simulate("click");

    expect(state.roomCreateBtnHandler).toHaveBeenCalled();
  });

  it("room search button test", () => {
    const wrapper = shallow(<CasualBattleLobby />);

    const btn = wrapper.find("#search-btn");
    btn.simulate("click");

    expect(state.roomSearchBtnHandler).toHaveBeenCalled();
  });
});
