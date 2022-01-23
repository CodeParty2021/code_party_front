import React from "react";
import { shallow } from "enzyme";
import { SignOutButton } from "./SignOutButton";
import { useDispatch } from "react-redux";
import { signOut } from "../../services/user/user";

jest.mock("react-redux");
const useDispatchMock = useDispatch as jest.Mock;

describe("<SignOutButton />", () => {
  it("SignOutButton snapshot test", () => {
    useDispatchMock.mockReturnValue(signOut());
    const wrapper = shallow(<SignOutButton />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
