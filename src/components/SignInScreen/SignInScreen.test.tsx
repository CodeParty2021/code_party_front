import React from "react";
import { shallow } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import { SignInScreen } from "components/SignInScreen/SignInScreen";
import { LoginUserState } from "../../services/user/user";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("../../services/user/user");

const useSelectorMock = useSelector as jest.Mock<LoginUserState>;
const useDispatchMock = useDispatch as jest.Mock;

describe("<SignInScreen />", () => {
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

  // browserRouterで挟まないとエラーが出る？
  // https://stackoverflow.com/questions/70029935/react-router-v6-usenavigate-may-be-used-only-in-the-context-of-a-router-co
  it("dispatches add stage action", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <SignInScreen />
      </BrowserRouter>
    );

    //expect(wrapper.find("li").text()).toEqual("<StageDetail />");
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
