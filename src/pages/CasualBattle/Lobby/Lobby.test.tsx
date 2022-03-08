import React from "react";
import { shallow } from "enzyme";

import { CasualBattleLobby } from "./Lobby";
import { IResponse, useLobbyState } from "./hooks/useLobbyState";

jest.mock("./hooks/useLobbyState");

const useSelectorMock = useLobbyState as jest.Mock;

const state: IResponse = {
  roomCreateBtnHandler: jest.fn(),
  roomSearchBtnHandler: jest.fn(),
};

describe("<CasualBattleWaitingRoom />", () => {
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
    const spy = jest.spyOn(state, "roomCreateBtnHandler");

    const btn = wrapper.find("#create-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("room search button test", () => {
    const wrapper = shallow(<CasualBattleLobby />);
    const spy = jest.spyOn(state, "roomSearchBtnHandler");

    const btn = wrapper.find("#search-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});
