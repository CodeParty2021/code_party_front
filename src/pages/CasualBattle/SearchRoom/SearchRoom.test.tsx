import React from "react";
import { shallow } from "enzyme";

import { CasualBattleSearchRoom } from "./SearchRoom";
import { IResponse, useSearchRoomState } from "./hooks/useSearchRoomState";

jest.mock("./hooks/useSearchRoomState");

const useSelectorMock = useSearchRoomState as jest.Mock;

const state: IResponse = {
  enterBtnClickHandler: jest.fn(),
  roomIdTextBoxChangeHandler: jest.fn(),
  roomIdTextBoxValue: "typed value",
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
    const wrapper = shallow(<CasualBattleSearchRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("enter button test", () => {
    const wrapper = shallow(<CasualBattleSearchRoom />);
    const spy = jest.spyOn(state, "enterBtnClickHandler");

    const btn = wrapper.find("#enter-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("room id text box test", () => {
    const wrapper = shallow(<CasualBattleSearchRoom />);
    const spy = jest.spyOn(state, "roomIdTextBoxChangeHandler");

    const event = {
      target: {
        value: "update value",
      },
    };

    const btn = wrapper.find("#roomid-textbox");
    btn.simulate("change", event);

    expect(spy).toHaveBeenCalled();
  });
});
