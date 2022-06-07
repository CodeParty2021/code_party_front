import React from "react";
import { shallow } from "enzyme";

import { CasualBattleInvitation } from "./Invitation";
import { IResponse, useInvitationState } from "./hooks/useInvitationState";

jest.mock("./hooks/useInvitationState");

const useSelectorMock = useInvitationState as jest.Mock;

const state: IResponse = {
  isLogin: true,
  errorMessage: undefined,
  roomId: "sampleID",
  enterBtnDisabled: true,
  enterBtnClickHandler: jest.fn(),
  hostName: "hostName",
};

describe("<CasualBattleInvitation />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattleInvitation />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("enter button test", () => {
    const wrapper = shallow(<CasualBattleInvitation />);
    const btn = wrapper.find("#enter-btn");
    btn.simulate("click");

    expect(state.enterBtnClickHandler).toHaveBeenCalled();
  });
});
