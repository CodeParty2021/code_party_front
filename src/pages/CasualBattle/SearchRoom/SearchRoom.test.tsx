import React from "react";
import { shallow } from "enzyme";

import { CasualBattleSearchRoom } from "./SearchRoom";
import { IResponse, useSearchRoomState } from "./hooks/useSearchRoomState";

jest.mock("./hooks/useSearchRoomState");

const useSelectorMock = useSearchRoomState as jest.Mock;

const state: IResponse = {
  enterBtnDisabled: false,
  enterBtnClickHandler: jest.fn(),
  roomIdTextBoxChangeHandler: jest.fn(),
  roomIdTextBoxValue: "typed value",
};

describe("<CasualBattleSearchRoom />", () => {
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

    const btn = wrapper.find("#enter-btn");
    btn.simulate("click");

    expect(state.enterBtnClickHandler).toHaveBeenCalled();
  });

  it("room id text box test", () => {
    const wrapper = shallow(<CasualBattleSearchRoom />);

    const event = {
      target: {
        value: "update value",
      },
    };

    const btn = wrapper.find("#roomid-textbox");
    btn.simulate("change", event);

    expect(state.roomIdTextBoxChangeHandler).toHaveBeenCalled();
  });
});
