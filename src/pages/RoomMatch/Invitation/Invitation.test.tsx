import React from "react";
import { shallow } from "enzyme";

import { RoomMatchInvitation } from "./Invitation";
import { IResponse, useInvitationState } from "./hooks/useInvitationState";
import { useFirebaseAuth } from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";

jest.mock("./hooks/useInvitationState");
jest.mock("hooks/FirebaseAuthHooks/useFirebaseAuthHooks");

const useSelectorMock = useInvitationState as jest.Mock;

const useFirebaseAuthMock = useFirebaseAuth as jest.Mock;

const state: IResponse = {
  isLogin: true,
  errorMessage: undefined,
  roomId: "sampleID",
  enterBtnDisabled: true,
  enterBtnClickHandler: jest.fn(),
  hostName: "hostName",
};

describe("<RoomMatchInvitation />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
    useFirebaseAuthMock.mockReturnValue({
      signInOfFirebase: jest.fn(),
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<RoomMatchInvitation />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
