import React from "react";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { Top } from "pages/Top/Top";
jest.mock("react-redux");
jest.mock("react-router-dom");

const useSelectorMock = useSelector as jest.Mock;

describe("privateRoute", () => {
  it("privateRoute snapshot test", () => {
    useSelectorMock.mockReturnValue({
      user: {
        id: "userid1",
        displayName: "ffawefae",
        email: "feaeafa@fafe.com",
        picture: "fewfawefaewf.png",
        jwt: "feefawef390urjfo",
      },
      isLogin: false,
      unRegisterObserver: null,
      loading: false,
    });
    const wrapper = shallow(
      <PrivateRoute component={Top} redirectUrl="/event" />
    );

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
