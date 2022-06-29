import React from "react";
import { shallow } from "enzyme";
import { CodeList } from "./CodeList";
import { useSelector } from "react-redux";
import { LoginUserState } from "services/user/user";
jest.mock("react-redux");
jest.mock("react-router-dom");

const useSelectorMock = useSelector as jest.Mock<LoginUserState>;

describe("<CodeList />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      user: {
        id: "few",
        displayName: "ffawefae",
        email: "feaeafa@fafe.com",
        picture: "fewfawefaewf.png",
        jwt: "feefawef390urjfo",
        isAnonymous: false,
      },
      isLogin: true,
      unRegisterObserver: null,
      loading: false,
    });
  });
  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeList />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
