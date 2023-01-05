import React from "react";
import { shallow } from "enzyme";

import { RoomMatchLobby } from "./Lobby";
import { IResponse, useLobbyState } from "./hooks/useLobbyState";

jest.mock("./hooks/useLobbyState");

const useSelectorMock = useLobbyState as jest.Mock;

const state: IResponse = {
  isLoading: false,
  errorMessage: "aaa",
  roomIdRef: { current: null },
  createRoomHandler: () => {},
  createRoomDisabled: false,
  enterRoomHandler: () => {},
  enterRoomDisabled: false,
  backButtonHandler: () => {},
};

describe("<RoomMatchLobby />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<RoomMatchLobby />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
