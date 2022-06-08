import React from "react";
import { shallow } from "enzyme";
import { RootingScreen } from "./RootingScreen";
import { useDispatch, useSelector } from "react-redux";
import { signOut, LoginUserState } from "../../services/user/user";

jest.mock("react-redux");

const useSelectorMock = useSelector as jest.Mock<LoginUserState>;
const useDispatchMock = useDispatch as jest.Mock;

describe("<RootingScreen />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      user: null,
      isLogin: false,
      unRegisterObserver: null,
      loading: false,
    });
    useDispatchMock.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("RootingScreen snapshot test", () => {
    useDispatchMock.mockReturnValue(signOut());
    const wrapper = shallow(<RootingScreen />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
